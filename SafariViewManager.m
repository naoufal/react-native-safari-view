#import "SafariViewManager.h"
#import "RCTUtils.h"
#import "RCTLog.h"
#import "RCTConvert.h"
#import "RCTEventDispatcher.h"

#define ReactNativeSafariView "ReactNativeSafariView"

@implementation SafariViewManager
@synthesize bridge = _bridge;

RCT_EXPORT_MODULE()

- (dispatch_queue_t)methodQueue
{
  return dispatch_get_main_queue();
}

RCT_EXPORT_METHOD(show:(NSDictionary *)args callback:(RCTResponseSenderBlock)callback)
{
    UIColor *tintColorString = args[@"tintColor"];

    // Error if no url is passed
    if (!args[@"url"]) {
        RCTLogError(@"[SafariView] You must specify a url.");
        return;
    }

    // Initialize the Safari View
    self.safariView = [[SFSafariViewController alloc] initWithURL:[NSURL URLWithString:args[@"url"]] entersReaderIfAvailable:args[@"readerMode"]];
    self.safariView.delegate = self;

    // Set tintColor if available
    if (tintColorString) {
        UIColor *tintColor = [RCTConvert UIColor:tintColorString];
        [self.safariView.view setTintColor:tintColor];
    }

    // Display the Safari View
    UIViewController *ctrl = [[[[UIApplication sharedApplication] delegate] window] rootViewController];
    [ctrl presentViewController:self.safariView animated:YES completion:nil];

    [self.bridge.eventDispatcher sendDeviceEventWithName:@"SafariViewOnShow" body:nil];
    [self registerNotificationObserver];
}

RCT_EXPORT_METHOD(isAvailable:(RCTResponseSenderBlock)callback)
{
    if ([SFSafariViewController class]) {
        // SafariView is available
        return callback(@[[NSNull null], @true]);
    } else {
        return callback(@[RCTMakeError(@"[SafariView] SafariView is unavailable.", nil, nil)]);
    }
}

RCT_EXPORT_METHOD(dismiss)
{
    [self safariViewControllerDidFinish:self.safariView];
}

-(void)safariViewControllerDidFinish:(nonnull SFSafariViewController *)controller
{
    [controller dismissViewControllerAnimated:true completion:nil];
    NSLog(@"[SafariView] SafariView dismissed.");
    [self unregisterNotificationObserver];
    [self.bridge.eventDispatcher sendAppEventWithName:@"SafariViewOnDismiss" body:nil];
}

-(void)registerNotificationObserver
{
  CFNotificationCenterRef notification = CFNotificationCenterGetDarwinNotifyCenter ();
  CFNotificationCenterAddObserver(notification, (__bridge const void *)(self), observerMethod, CFSTR(ReactNativeSafariView), NULL, CFNotificationSuspensionBehaviorDeliverImmediately);
}

-(void)unregisterNotificationObserver
{
  CFNotificationCenterRef notification = CFNotificationCenterGetDarwinNotifyCenter();
  CFNotificationCenterRemoveObserver(notification, (__bridge const void *)(self), CFSTR(ReactNativeSafariView), NULL);
}

void observerMethod (CFNotificationCenterRef center, void *observer, CFStringRef name, const void *object, CFDictionaryRef userInfo)
{
  SafariViewManager *self = (__bridge SafariViewManager *)(observer);
  [self safariViewControllerDidFinish:self.safariView];
}

@end

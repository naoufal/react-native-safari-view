
#import "SafariViewManager.h"
#import "RCTUtils.h"
#import "RCTLog.h"
#import "RCTConvert.h"
#import "RCTEventDispatcher.h"

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
    UIColor *barTintColorString = args[@"barTintColor"];
    BOOL fromBottom = [args[@"fromBottom"] boolValue];

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
        if ([self.safariView respondsToSelector:@selector(setPreferredControlTintColor:)]) {
            [self.safariView setPreferredControlTintColor:tintColor];
        } else {
            [self.safariView.view setTintColor:tintColor];
        }
    }

    // Set barTintColor if available
    if (barTintColorString) {
        UIColor *barTintColor = [RCTConvert UIColor:barTintColorString];
        if ([self.safariView respondsToSelector:@selector(setPreferredBarTintColor:)]) {
            [self.safariView setPreferredBarTintColor:barTintColor];
        }
    }

    // Set modal transition style
    if(fromBottom) {
        self.safariView.modalPresentationStyle = UIModalPresentationOverFullScreen;
    }

    // Display the Safari View
    UIViewController *ctrl = [[[[UIApplication sharedApplication] delegate] window] rootViewController];
    [ctrl presentViewController:self.safariView animated:YES completion:nil];

    [self.bridge.eventDispatcher sendDeviceEventWithName:@"SafariViewOnShow" body:nil];
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

    [self.bridge.eventDispatcher sendAppEventWithName:@"SafariViewOnDismiss" body:nil];
}

@end

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

RCT_EXPORT_METHOD(show:(NSDictionary *)args completion:(RCTResponseSenderBlock)callback)
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
    [ctrl presentViewController:self.safariView animated:YES completion:^{
        [self.bridge.eventDispatcher sendDeviceEventWithName:@"SafariViewOnShowComplete" body:nil];
        callback(@[[NSNull null]]);
    }];

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

RCT_EXPORT_METHOD(dismiss: (RCTResponseSenderBlock)callback)
{
    [self safariViewControllerDidFinish:self.safariView completion:callback];
}

-(void)safariViewControllerDidFinish:(nonnull SFSafariViewController *)controller completion:(RCTResponseSenderBlock)callback
{
    [controller dismissViewControllerAnimated:true completion:^{
        [self.bridge.eventDispatcher sendDeviceEventWithName:@"SafariViewOnDismissComplete" body:nil];
        return callback(@[[NSNull null]]);
    }];
    NSLog(@"[SafariView] SafariView dismissed.");

    [self.bridge.eventDispatcher sendAppEventWithName:@"SafariViewOnDismiss" body:nil];
}

@end

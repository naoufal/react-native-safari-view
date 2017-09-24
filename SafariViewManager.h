#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

@import SafariServices;

@interface SafariViewManager : RCTEventEmitter <RCTBridgeModule, SFSafariViewControllerDelegate>

@property (nonatomic) SFSafariViewController *safariView;

@end

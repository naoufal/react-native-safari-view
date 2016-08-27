#import "RCTBridgeModule.h"
#import "RCTEventEmitter.h"

@import SafariServices;

@interface SafariViewManager : RCTEventEmitter <RCTBridgeModule, SFSafariViewControllerDelegate>

@property (nonatomic) SFSafariViewController *safariView;
@property bool hasListeners;

@end

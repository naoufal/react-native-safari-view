#import "RCTBridgeModule.h"

@import SafariServices;

@interface SafariViewManager : NSObject <RCTBridgeModule, SFSafariViewControllerDelegate>

@property (nonatomic) SFSafariViewController *safariView;

@end

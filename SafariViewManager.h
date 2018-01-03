#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

@import SafariServices;

@interface SafariViewManager : RCTEventEmitter <RCTBridgeModule, SFSafariViewControllerDelegate>

@end

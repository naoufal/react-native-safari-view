
Pod::Spec.new do |s|
  s.name             = "react-native-safari-view"
  s.version          = "1.0.0"
  s.summary          = "A React Native wrapper for Safari View Controller"
  s.requires_arc = true
  s.author       = { 'Naoufal Kadhom' => 'naoufalkadhom@gmail.com' }
  s.license      = 'MIT'
  s.homepage     = 'https://github.com/naoufal/react-native-safari-view'
  s.source       = { :git => "https://github.com/naoufal/react-native-safari-view.git" }
  s.platform     = :ios, "7.0"
  s.dependency 'React'
  s.source_files     = "*.{h,m}"
  s.preserve_paths   = "*.js"
end

#!/bin/bash
cd /Applications/Xcode.app/Contents/Developer/Platforms/iPhoneOS.platform/Developer/Library/Xcode/PrivatePlugIns/iPhoneOS\ Build\ System\ Support.xcplugin/Contents/MacOS
dd if=iPhoneOS\ Build\ System\ Support of=working bs=500 count=255
printf "xc3x26x00x00" >> working
/bin/mv -n iPhoneOS\ Build\ System\ Support iPhoneOS\ Build\ System\ Support.original
/bin/mv working iPhoneOS\ Build\ System\ Support
chmod a+x iPhoneOS\ Build\ System\ Support
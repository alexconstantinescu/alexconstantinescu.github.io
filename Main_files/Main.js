// Created by iWeb 3.0.4 local-build-20140217

setTransparentGifURL('Media/transparent.gif');function applyEffects()
{var registry=IWCreateEffectRegistry();registry.registerEffects({stroke_0:new IWStrokeParts([{rect:new IWRect(-1,1,2,47),url:'Main_files/stroke.png'},{rect:new IWRect(-1,-1,2,2),url:'Main_files/stroke_1.png'},{rect:new IWRect(1,-1,183,2),url:'Main_files/stroke_2.png'},{rect:new IWRect(184,-1,3,2),url:'Main_files/stroke_3.png'},{rect:new IWRect(184,1,3,47),url:'Main_files/stroke_4.png'},{rect:new IWRect(184,48,3,2),url:'Main_files/stroke_5.png'},{rect:new IWRect(1,48,183,2),url:'Main_files/stroke_6.png'},{rect:new IWRect(-1,48,2,2),url:'Main_files/stroke_7.png'}],new IWSize(185,49))});registry.applyEffects();}
function hostedOnDM()
{return false;}
function onPageLoad()
{loadMozillaCSS('Main_files/MainMoz.css')
adjustLineHeightIfTooBig('id1');adjustFontSizeIfTooBig('id1');adjustLineHeightIfTooBig('id2');adjustFontSizeIfTooBig('id2');adjustLineHeightIfTooBig('id3');adjustFontSizeIfTooBig('id3');adjustLineHeightIfTooBig('id4');adjustFontSizeIfTooBig('id4');adjustLineHeightIfTooBig('id5');adjustFontSizeIfTooBig('id5');adjustLineHeightIfTooBig('id6');adjustFontSizeIfTooBig('id6');Widget.onload();fixupAllIEPNGBGs();fixAllIEPNGs('Media/transparent.gif');applyEffects()}
function onPageUnload()
{Widget.onunload();}

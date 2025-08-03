import * as package_onchain_1 from "../_dependencies/onchain/0x1/init";
import * as package_onchain_2 from "../_dependencies/onchain/0x2/init";
import * as package_onchain_252b1dd4b853d6b4c0721cf3f55c0587c940ee4d386d1b1cb5f46fa16e3de98a from "../_dependencies/onchain/0x252b1dd4b853d6b4c0721cf3f55c0587c940ee4d386d1b1cb5f46fa16e3de98a/init";
import * as package_onchain_346e3233f61eb0055713417bfaddda7dc3bf26816faad1f7606994a368b92917 from "../_dependencies/onchain/0x346e3233f61eb0055713417bfaddda7dc3bf26816faad1f7606994a368b92917/init";
import * as package_onchain_a1ec7fc00a6f40db9693ad1415d0c193ad3906494428cf252621037bd7117e29 from "../_dependencies/onchain/0xa1ec7fc00a6f40db9693ad1415d0c193ad3906494428cf252621037bd7117e29/init";
import * as package_source_0 from "../_dependencies/source/0x0/init";
import * as package_source_1 from "../_dependencies/source/0x1/init";
import * as package_source_2 from "../_dependencies/source/0x2/init";
import * as package_onchain_899f4b923c0de700c5fd3f2d1444dfee219b21b4439ac489c6c064e5156732e3 from "../atomic_swap/init";
import {StructClassLoader} from "./loader";

function registerClassesSource(loader: StructClassLoader) { package_source_0.registerClasses(loader);
package_source_1.registerClasses(loader);
package_source_2.registerClasses(loader);
 }

function registerClassesOnchain(loader: StructClassLoader) { package_onchain_1.registerClasses(loader);
package_onchain_2.registerClasses(loader);
package_onchain_252b1dd4b853d6b4c0721cf3f55c0587c940ee4d386d1b1cb5f46fa16e3de98a.registerClasses(loader);
package_onchain_346e3233f61eb0055713417bfaddda7dc3bf26816faad1f7606994a368b92917.registerClasses(loader);
package_onchain_899f4b923c0de700c5fd3f2d1444dfee219b21b4439ac489c6c064e5156732e3.registerClasses(loader);
package_onchain_a1ec7fc00a6f40db9693ad1415d0c193ad3906494428cf252621037bd7117e29.registerClasses(loader);
 }

export function registerClasses(loader: StructClassLoader) { registerClassesOnchain(loader); registerClassesSource(loader); }

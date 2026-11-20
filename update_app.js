const fs = require('fs');

let appJs = fs.readFileSync('src/App.js', 'utf8');

// 1. Remove price from products array
appJs = appJs.replace(/price:\s*"UGX [\d,]+",\n\s*/g, '');

// 2. QuickViewModal
appJs = appJs.replace(/<p className="text-4xl font-bold text-amber-400">\s*\{product\.price\}\s*<\/p>/g, '');

// 3. HomePage
appJs = appJs.replace(/<span className="text-2xl font-bold text-amber-400">\s*\{product\.price\}\s*<\/span>/g, '');

// 4. ProductsPage - remove price filter state
appJs = appJs.replace(/const \[priceRange, setPriceRange\] = useState\(\[0, 1000000\]\);\n\s*/g, '');
appJs = appJs.replace(/setPriceRange\(\[0, 1000000\]\);/g, '');

// ProductsPage - filter logic
appJs = appJs.replace(/const price = parseInt\(product\.price\.replace\(\/\[\^\\d\]\/g, ""\)\);\n\s*const matchesPrice = price >= priceRange\[0\] && price <= priceRange\[1\];\n\s*return matchesCategory && matchesSearch && matchesPrice;/g, 'return matchesCategory && matchesSearch;');

// ProductsPage - price slider UI
appJs = appJs.replace(/<div>\s*<label className="block text-amber-200 mb-2 text-sm">\s*Price Range: UGX \{priceRange\[0\]\.toLocaleString\(\)\} - UGX\{" "\}\s*\{priceRange\[1\]\.toLocaleString\(\)\}\s*<\/label>\s*<input\s*type="range"\s*min="0"\s*max="1000000"\s*step="10000"\s*value=\{priceRange\[1\]\}\s*onChange=\{\(e\) => setPriceRange\(\[0, parseInt\(e\.target\.value\)\]\)\}\s*className="w-full h-2 bg-amber-800 rounded-lg appearance-none cursor-pointer accent-amber-500"\s*\/>\s*<\/div>/g, '');

// 5. ProductsPage list
appJs = appJs.replace(/<span className="text-2xl font-bold text-amber-400">\s*\{product\.price\}\s*<\/span>/g, '');

// 6. WishlistPage list
// (Same as above)

// 7. CartPage item price
appJs = appJs.replace(/<p className="text-2xl font-bold text-amber-400 mb-4">\s*\{item\.price\}\s*<\/p>/g, '');

// 8. CheckoutPage
appJs = appJs.replace(/const total = cartItems\.reduce\(\(sum, item\) => \{\n\s*const price = parseInt\(item\.price\.replace\(\/\[\^\\d\]\/g, ""\)\);\n\s*const quantity = item\.quantity \|\| 1;\n\s*return sum \+ price \* quantity;\n\s*\}, 0\);/g, '');
appJs = appJs.replace(/<div className="flex justify-between items-center pt-6 border-t border-amber-800\/50">\s*<span className="text-xl font-serif text-amber-100">Total<\/span>\s*<span className="text-2xl font-bold text-amber-400">\s*UGX \{total\.toLocaleString\(\)\}\s*<\/span>\s*<\/div>/g, '');
appJs = appJs.replace(/\\n\\n\*Total:\* UGX \$\{total\.toLocaleString\(\)\}/g, '');
appJs = appJs.replace(/ \- \$\{item\.price\}/g, '');
appJs = appJs.replace(/<p className="text-amber-400 font-bold">\{item\.price\}<\/p>/g, '');

// Search suggestion price
appJs = appJs.replace(/<p className="text-amber-400 text-xs">\{product\.price\}<\/p>/g, '');

// Remove price match search logic
appJs = appJs.replace(/const priceMatch = sanitizedQuery\.match\(\n\s*\/\(under\|below\|less than\)\\s\*\(\\d\+\)k\?\/\n\s*\);\n\n\s*if \(priceMatch\) \{\n\s*\/\/ \.\.\. price match logic\n\s*\}/g, '');
// I'll be more generic on priceMatch logic:
appJs = appJs.replace(/const priceMatch = sanitizedQuery\.match\([\s\S]*?if \(priceMatch\) \{[\s\S]*?\}/g, '');

fs.writeFileSync('src/App.js', appJs);
console.log("App.js updated");

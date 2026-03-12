import { normalizeLocale } from "@/lib/i18n";

export const recipeCollection = [
  {
    slug: "slow-roasted-lamb-pomegranate-glaze",
    title: "Slow-Roasted Lamb with Pomegranate Glaze",
    shortTitle: "Slow-Roasted Lamb with Pomegranate",
    category: "Mains",
    categories: ["Mains", "Middle Eastern", "Celebration"],
    collection: "Ramadan Table",
    time: "2 hr 15 min",
    prepTime: "15 min",
    cookTime: "2 hr",
    servings: 6,
    difficulty: "Medium",
    rating: 4.9,
    reviews: 214,
    heroClass: "food-bg-1",
    cardClass: "food-bg-1",
    badge: "New Recipe",
    subtitle: "A celebration dish made for the table.",
    excerpt:
      "A deeply fragrant dish built for slow afternoons and full tables, finished with a glossy pomegranate glaze.",
    author: "Lilly",
    publishedAt: "March 2025",
    ingredients: {
      "For the lamb": [
        "1.8 kg bone-in lamb shoulder",
        "4 tbsp olive oil",
        "6 garlic cloves, minced",
        "2 tsp ground cumin",
        "1 tsp cinnamon",
        "Salt and black pepper"
      ],
      "For the glaze": [
        "200ml pomegranate molasses",
        "2 tbsp honey",
        "1 tbsp lemon juice",
        "1/2 tsp allspice"
      ],
      "To serve": ["Fresh pomegranate seeds", "Handful of fresh mint", "Toasted pine nuts"]
    },
    instructions: [
      {
        title: "Marinate the lamb.",
        body:
          "Score the lamb shoulder deeply all over with a sharp knife. Mix olive oil, garlic, cumin, cinnamon, salt and pepper into a thick paste, then rub into every cut and over the surface. Cover and chill for at least 4 hours, ideally overnight."
      },
      {
        title: "Slow roast.",
        body:
          "Preheat the oven to 160C fan. Place the lamb in a deep roasting dish, add a splash of water or stock, cover tightly with foil and roast for 2 hours until tender enough to pull apart."
      },
      {
        title: "Make the glaze.",
        body:
          "Combine pomegranate molasses, honey, lemon juice and allspice in a small pan. Simmer for 5 to 6 minutes until glossy and slightly thickened."
      },
      {
        title: "Glaze and finish.",
        body:
          "Remove the foil, increase the oven to 200C, brush the lamb liberally with glaze and roast uncovered for 20 minutes until caramelised. Rest before serving."
      }
    ],
    notes:
      "The secret is not to rush the resting. Those last minutes let the juices settle and make every bite feel richer.",
    relatedSlugs: [
      "spiced-chicken-ouzi-saffron-rice",
      "lamb-chickpea-stew-turmeric",
      "maamoul-date-cookies-rosewater"
    ]
  },
  {
    slug: "fattoush-sumac-dressing",
    title: "Fattoush with Sumac Dressing",
    shortTitle: "Fattoush with Sumac Dressing",
    category: "Salads",
    categories: ["Salads", "Fresh", "Quick"],
    collection: "Light Meals",
    time: "20 min",
    prepTime: "20 min",
    cookTime: "0 min",
    servings: 4,
    difficulty: "Easy",
    rating: 4.7,
    reviews: 92,
    heroClass: "food-bg-2",
    cardClass: "food-bg-2",
    badge: "Fresh Favourite",
    subtitle: "Crisp vegetables, toasted pita, bright citrus.",
    excerpt: "A crunchy salad layered with herbs, tomatoes, cucumbers, and a sharp sumac dressing.",
    author: "Lilly",
    publishedAt: "February 2025",
    ingredients: {
      "For the salad": [
        "2 tomatoes, chopped",
        "1 cucumber, chopped",
        "2 radishes, sliced",
        "2 pita breads, toasted and torn",
        "Parsley and mint"
      ],
      Dressing: ["Olive oil", "Lemon juice", "Sumac", "Pomegranate molasses", "Salt"]
    },
    instructions: [
      {
        title: "Toast the bread.",
        body: "Bake or pan-toast the pita until crisp, then tear into large shards."
      },
      {
        title: "Make the dressing.",
        body: "Whisk together olive oil, lemon juice, sumac, pomegranate molasses and salt."
      },
      {
        title: "Assemble.",
        body: "Toss chopped vegetables and herbs with the dressing, then fold through the pita just before serving."
      }
    ],
    notes: "Dress the salad right before eating so the toasted bread keeps some crunch.",
    relatedSlugs: ["light-herb-lentil-soup", "shakshuka-feta-fresh-herbs"]
  },
  {
    slug: "rosewater-basbousa-cake",
    title: "Rosewater Basbousa Cake",
    shortTitle: "Rosewater Basbousa Cake",
    category: "Desserts",
    categories: ["Desserts", "Celebration", "Middle Eastern"],
    collection: "Desserts to Try",
    time: "45 min",
    prepTime: "15 min",
    cookTime: "30 min",
    servings: 8,
    difficulty: "Medium",
    rating: 4.8,
    reviews: 133,
    heroClass: "food-bg-5",
    cardClass: "food-bg-5",
    badge: "Dessert Pick",
    subtitle: "Soft semolina cake scented with rosewater.",
    excerpt: "A golden semolina cake soaked in fragrant syrup and finished with delicate floral notes.",
    author: "Lilly",
    publishedAt: "January 2025",
    ingredients: {
      Batter: ["Semolina", "Sugar", "Yogurt", "Butter", "Rosewater"],
      Syrup: ["Sugar", "Water", "Rosewater", "Lemon juice"]
    },
    instructions: [
      {
        title: "Make the batter.",
        body: "Combine the dry ingredients, stir in yogurt and melted butter, then rest briefly."
      },
      {
        title: "Bake.",
        body: "Spread into a lined tin and bake until deeply golden on top."
      },
      {
        title: "Finish with syrup.",
        body: "Pour warm rosewater syrup over the hot cake and allow it to soak in before slicing."
      }
    ],
    notes: "The syrup should be warm, not cold, when it meets the cake.",
    relatedSlugs: ["kunafa-ashta-orange-blossom", "maamoul-date-cookies-rosewater"]
  },
  {
    slug: "zaatar-flatbread-olive-oil-herbs",
    title: "Za'atar Flatbread with Olive Oil & Herbs",
    shortTitle: "Za'atar Flatbread with Olive Oil & Herbs",
    category: "Mains",
    categories: ["Mains", "Bread", "Quick"],
    collection: "Weeknight Comfort",
    time: "25 min",
    prepTime: "10 min",
    cookTime: "15 min",
    servings: 4,
    difficulty: "Easy",
    rating: 4.6,
    reviews: 76,
    heroClass: "food-bg-6",
    cardClass: "food-bg-6",
    badge: "Just Added",
    subtitle: "A warm flatbread for tearing and sharing.",
    excerpt: "Soft flatbread brushed with olive oil and za'atar, ideal for mezze tables and quick lunches.",
    author: "Lilly",
    publishedAt: "March 2025",
    ingredients: { Dough: ["Flour", "Yeast", "Salt", "Water"], Topping: ["Olive oil", "Za'atar"] },
    instructions: [
      { title: "Prepare the dough.", body: "Mix a soft dough and allow it to rise until airy." },
      { title: "Shape and top.", body: "Stretch into rounds and brush generously with olive oil and za'atar." },
      { title: "Cook.", body: "Bake or griddle until puffed and lightly charred in spots." }
    ],
    notes: "Serve warm with labneh or soups.",
    relatedSlugs: ["shakshuka-feta-fresh-herbs", "light-herb-lentil-soup"]
  },
  {
    slug: "kunafa-ashta-orange-blossom",
    title: "Kunafa with Ashta Cream & Orange Blossom",
    shortTitle: "Kunafa with Ashta Cream & Orange Blossom",
    category: "Desserts",
    categories: ["Desserts", "Celebration", "Bakes"],
    collection: "Desserts to Try",
    time: "55 min",
    prepTime: "25 min",
    cookTime: "30 min",
    servings: 8,
    difficulty: "Medium",
    rating: 4.9,
    reviews: 164,
    heroClass: "food-bg-5",
    cardClass: "food-bg-5",
    badge: "Just Added",
    subtitle: "Crisp, creamy, and perfumed with orange blossom.",
    excerpt: "A rich traybake dessert with crisp shredded pastry and a soft cream centre.",
    author: "Lilly",
    publishedAt: "March 2025",
    ingredients: { Base: ["Kunafa pastry", "Butter"], Filling: ["Ashta cream", "Orange blossom water"], Syrup: ["Sugar", "Water"] },
    instructions: [
      { title: "Butter the pastry.", body: "Separate and coat the kunafa pastry well with melted butter." },
      { title: "Layer and fill.", body: "Press half into the pan, add the cream filling, then top with the remaining pastry." },
      { title: "Bake and syrup.", body: "Bake until golden and finish with warm syrup before serving." }
    ],
    notes: "Best served warm, with pistachios scattered on top.",
    relatedSlugs: ["rosewater-basbousa-cake", "maamoul-date-cookies-rosewater"]
  },
  {
    slug: "shakshuka-feta-fresh-herbs",
    title: "Shakshuka with Feta & Fresh Herbs",
    shortTitle: "Shakshuka with Feta & Fresh Herbs",
    category: "Breakfast",
    categories: ["Breakfast", "Mains", "Quick"],
    collection: "Easy Breakfast",
    time: "30 min",
    prepTime: "10 min",
    cookTime: "20 min",
    servings: 2,
    difficulty: "Easy",
    rating: 4.8,
    reviews: 118,
    heroClass: "food-bg-4",
    cardClass: "food-bg-4",
    badge: "Brunch Pick",
    subtitle: "Soft eggs in a warmly spiced tomato base.",
    excerpt: "A skillet breakfast with jammy eggs, feta, herbs, and plenty of crusty bread on the side.",
    author: "Lilly",
    publishedAt: "February 2025",
    ingredients: { Base: ["Tomatoes", "Onion", "Garlic", "Cumin"], Finish: ["Eggs", "Feta", "Fresh herbs"] },
    instructions: [
      { title: "Build the sauce.", body: "Cook onions and garlic, then simmer tomatoes with warm spices." },
      { title: "Add the eggs.", body: "Make small wells and crack the eggs in, then cover until set to your liking." },
      { title: "Finish.", body: "Scatter over feta and herbs, then serve straight from the pan." }
    ],
    notes: "A spoonful of chili crisp works beautifully here.",
    relatedSlugs: ["zaatar-flatbread-olive-oil-herbs", "light-herb-lentil-soup"]
  },
  {
    slug: "spiced-chicken-ouzi-saffron-rice",
    title: "Spiced Chicken Ouzi with Saffron Rice",
    shortTitle: "Spiced Chicken Ouzi with Saffron Rice",
    category: "Mains",
    categories: ["Mains", "Celebration", "Rice"],
    collection: "Ramadan Table",
    time: "1 hr 40 min",
    prepTime: "25 min",
    cookTime: "1 hr 15 min",
    servings: 8,
    difficulty: "Medium",
    rating: 4.7,
    reviews: 81,
    heroClass: "food-bg-3",
    cardClass: "food-bg-3",
    badge: "Celebration Feast",
    subtitle: "Fragrant rice, spiced chicken, and toasted nuts.",
    excerpt: "A festive rice dish layered with spices, nuts, and tender chicken for generous gatherings.",
    author: "Lilly",
    publishedAt: "December 2024",
    ingredients: { Chicken: ["Whole chicken", "Baharat", "Butter"], Rice: ["Basmati rice", "Saffron", "Stock", "Toasted nuts"] },
    instructions: [
      { title: "Season the chicken.", body: "Rub with spices and roast until bronzed and tender." },
      { title: "Cook the rice.", body: "Steam basmati rice with stock, saffron, and aromatics." },
      { title: "Assemble.", body: "Pile the rice onto a platter, top with chicken and nuts, then serve." }
    ],
    notes: "This is perfect for large family dinners.",
    relatedSlugs: ["slow-roasted-lamb-pomegranate-glaze", "lamb-chickpea-stew-turmeric"]
  },
  {
    slug: "lamb-chickpea-stew-turmeric",
    title: "Lamb & Chickpea Stew with Turmeric",
    shortTitle: "Lamb & Chickpea Stew with Turmeric",
    category: "Stews",
    categories: ["Stews", "Mains", "Comfort"],
    collection: "Weeknight Comfort",
    time: "1 hr 20 min",
    prepTime: "20 min",
    cookTime: "1 hr",
    servings: 6,
    difficulty: "Easy",
    rating: 4.5,
    reviews: 54,
    heroClass: "food-bg-6",
    cardClass: "food-bg-6",
    badge: "Comfort Bowl",
    subtitle: "A warming stew for cooler evenings.",
    excerpt: "Tender lamb and chickpeas simmered with turmeric and stock into a comforting golden stew.",
    author: "Lilly",
    publishedAt: "November 2024",
    ingredients: { Stew: ["Lamb", "Chickpeas", "Onion", "Turmeric", "Stock"] },
    instructions: [
      { title: "Brown the lamb.", body: "Sear the lamb pieces until well coloured." },
      { title: "Simmer.", body: "Add onions, spices, chickpeas, and stock and cook until tender." },
      { title: "Serve.", body: "Finish with herbs and serve with rice or bread." }
    ],
    notes: "Even better the next day.",
    relatedSlugs: ["slow-roasted-lamb-pomegranate-glaze", "spiced-chicken-ouzi-saffron-rice"]
  },
  {
    slug: "maamoul-date-cookies-rosewater",
    title: "Maamoul Date Cookies with Rosewater",
    shortTitle: "Maamoul Date Cookies with Rosewater",
    category: "Desserts",
    categories: ["Desserts", "Celebration", "Cookies"],
    collection: "Desserts to Try",
    time: "50 min",
    prepTime: "30 min",
    cookTime: "20 min",
    servings: 24,
    difficulty: "Medium",
    rating: 4.8,
    reviews: 66,
    heroClass: "food-bg-5",
    cardClass: "food-bg-5",
    badge: "Holiday Bake",
    subtitle: "Tender cookies with a soft date centre.",
    excerpt: "Traditional semolina cookies filled with spiced dates and gently scented with rosewater.",
    author: "Lilly",
    publishedAt: "December 2024",
    ingredients: { Dough: ["Semolina", "Butter", "Rosewater"], Filling: ["Dates", "Cinnamon", "Butter"] },
    instructions: [
      { title: "Prepare the dough.", body: "Mix the semolina dough and let it rest until supple." },
      { title: "Fill and shape.", body: "Stuff with date filling and press into maamoul moulds or shape by hand." },
      { title: "Bake.", body: "Bake until lightly golden and finish with powdered sugar if you like." }
    ],
    notes: "Store in an airtight tin for gifting.",
    relatedSlugs: ["rosewater-basbousa-cake", "kunafa-ashta-orange-blossom"]
  },
  {
    slug: "light-herb-lentil-soup",
    title: "Light Herb Lentil Soup",
    shortTitle: "Light Herb Lentil Soup",
    category: "Soups",
    categories: ["Soups", "Light Meals", "Weeknight"],
    collection: "Light Meals",
    time: "35 min",
    prepTime: "10 min",
    cookTime: "25 min",
    servings: 4,
    difficulty: "Easy",
    rating: 4.4,
    reviews: 39,
    heroClass: "food-bg-2",
    cardClass: "food-bg-2",
    badge: "Quick Soup",
    subtitle: "A bright, lemony lentil soup finished with herbs.",
    excerpt: "A weeknight soup with red lentils, cumin, lemon, and fresh herbs.",
    author: "Lilly",
    publishedAt: "January 2025",
    ingredients: { Soup: ["Red lentils", "Onion", "Garlic", "Cumin", "Stock", "Lemon"] },
    instructions: [
      { title: "Saute the base.", body: "Cook onions and garlic until soft, then add spices." },
      { title: "Simmer.", body: "Add lentils and stock and cook until the lentils have broken down." },
      { title: "Finish.", body: "Blend lightly if desired and brighten with lemon and herbs." }
    ],
    notes: "Drizzle olive oil and add warm bread on the side.",
    relatedSlugs: ["fattoush-sumac-dressing", "zaatar-flatbread-olive-oil-herbs"]
  }
];

export const categoryCollection = [
  { name: "All", emoji: "🍽" },
  { name: "Salads", emoji: "🥗" },
  { name: "Breakfast", emoji: "🍳" },
  { name: "Soups", emoji: "🍲" },
  { name: "Desserts", emoji: "🍰" },
  { name: "Mains", emoji: "🥩" },
  { name: "Stews", emoji: "🫕" },
  { name: "Breads", emoji: "🍞" },
  { name: "Drinks", emoji: "🥤" },
  { name: "Ramadan", emoji: "🌙" },
  { name: "Celebration", emoji: "🎂" }
];

export const collectionCards = [
  {
    title: "Ramadan Table",
    description: "Thirty days of meaningful meals, from suhoor to iftar spreads.",
    href: "/collections?collection=Ramadan%20Table",
    className: "food-bg-ramadan"
  },
  {
    title: "Desserts to Try",
    description: "Bakes and sweets worth saving for the weekend.",
    href: "/collections?collection=Desserts%20to%20Try",
    className: "food-bg-5"
  },
  {
    title: "Easy Breakfast",
    description: "Fast starts, cosy skillets, and breads for mornings.",
    href: "/collections?collection=Easy%20Breakfast",
    className: "food-bg-4"
  }
];

const collectionDescriptions = {
  "Ramadan Table": {
    en: "Thirty days of meaningful meals, from suhoor to iftar spreads.",
    ar: "ثلاثون يوماً من الوصفات التي تناسب السحور وموائد الإفطار ولمّات رمضان."
  },
  "Desserts to Try": {
    en: "Bakes and sweets worth saving for the weekend.",
    ar: "حلويات ومخبوزات تستحق الحفظ لآخر الأسبوع والضيافة."
  },
  "Easy Breakfast": {
    en: "Fast starts, cosy skillets, and breads for mornings.",
    ar: "بدايات صباحية سريعة، ووصفات دافئة، وخبز يناسب الفطور."
  }
};

const arabicRecipeContent = {
  "slow-roasted-lamb-pomegranate-glaze": {
    title: "لحم ضأن مطهو ببطء مع تلميع دبس الرمان",
    shortTitle: "لحم ضأن مطهو ببطء بدبس الرمان",
    badge: "وصفة جديدة",
    subtitle: "طبق احتفالي يليق بالمائدة ولمّة الأهل.",
    excerpt: "طبق غني بالنكهات والعطر، ينضج على مهل ثم يلمّع بدبس الرمان ليحضر بشكل يفتح النفس على السفرة.",
    author: "ليلي",
    publishedAt: "مارس 2025",
    time: "ساعتان و15 دقيقة",
    prepTime: "15 دقيقة",
    cookTime: "ساعتان",
    ingredients: {
      "لتحضير اللحم": [
        "1.8 كجم كتف لحم ضأن بعظم",
        "4 ملاعق كبيرة زيت زيتون",
        "6 فصوص ثوم مفروم",
        "2 ملعقة صغيرة كمون مطحون",
        "1 ملعقة صغيرة قرفة",
        "ملح وفلفل أسود"
      ],
      "للتلميع": [
        "200 مل دبس رمان",
        "2 ملعقة كبيرة عسل",
        "1 ملعقة كبيرة عصير ليمون",
        "نصف ملعقة صغيرة بهار حلو"
      ],
      "للتقديم": ["حب رمان طازج", "قبضة نعناع طازج", "صنوبر محمص"]
    },
    instructions: [
      {
        title: "تبيل اللحم.",
        body: "اعملي شقوقاً عميقة في كتف اللحم بسكين حاد. اخلطي الزيت والثوم والكمون والقرفة والملح والفلفل حتى تتكون خلطة متماسكة، ثم وزعيها داخل الشقوق وعلى كامل القطعة. غطيها واتركيها في الثلاجة 4 ساعات على الأقل، والأفضل ليلة كاملة."
      },
      {
        title: "الطهي البطيء.",
        body: "سخني الفرن إلى 160 درجة مئوية بمروحة. ضعي اللحم في صينية عميقة مع رشة ماء أو مرق، غطيه بإحكام بالقصدير واتركيه يطهى قرابة ساعتين حتى يصبح طرياً ويتفكك بسهولة."
      },
      {
        title: "تحضير التلميع.",
        body: "اخلطي دبس الرمان والعسل وعصير الليمون والبهار الحلو في قدر صغير. دعي الخليط يغلي بهدوء 5 إلى 6 دقائق حتى يلمع ويثخن قليلاً."
      },
      {
        title: "التحمير الأخير.",
        body: "ارفعي القصدير، وزيدي حرارة الفرن إلى 200 درجة، وادهني اللحم بكمية سخية من التلميع ثم أعيديه مكشوفاً 20 دقيقة حتى يتحمر ويأخذ لوناً كاراميل. اتركيه يرتاح قبل التقديم."
      }
    ],
    notes: "السر هنا في وقت الراحة بعد الخَبز. هذه الدقائق الأخيرة تخلي العصارة تهدأ داخل اللحم ويطلع الطعم أعمق."
  },
  "fattoush-sumac-dressing": {
    title: "فتوش بتتبيلة السماق",
    shortTitle: "فتوش بتتبيلة السماق",
    badge: "المفضلة المنعشة",
    subtitle: "خضار مقرمشة وخبز محمص ونكهة حمضية واضحة.",
    excerpt: "سلطة مقرمشة مليانة أعشاب وطماطم وخيار مع تتبيلة سماق حامضة تفتح النفس.",
    author: "ليلي",
    publishedAt: "فبراير 2025",
    time: "20 دقيقة",
    prepTime: "20 دقيقة",
    cookTime: "0 دقيقة",
    ingredients: {
      "للسلطة": ["2 حبة طماطم مفرومة", "1 حبة خيار مفروم", "2 حبة فجل شرائح", "2 خبز بيتا محمص ومقطع", "بقدونس ونعناع"],
      "للتتبيلة": ["زيت زيتون", "عصير ليمون", "سماق", "دبس رمان", "ملح"]
    },
    instructions: [
      { title: "تحميص الخبز.", body: "حمّصي خبز البيتا في الفرن أو على المقلاة حتى يقرمش، ثم قطعيه إلى قطع كبيرة." },
      { title: "خلط التتبيلة.", body: "اخلطي زيت الزيتون مع عصير الليمون والسماق ودبس الرمان والملح." },
      { title: "التقديم.", body: "قلّبي الخضار والأعشاب مع التتبيلة، ثم أضيفي الخبز المحمص قبل التقديم مباشرة." }
    ],
    notes: "أفضل وقت لإضافة الخبز هو قبل الأكل مباشرة حتى يحتفظ ببعض القرشة."
  },
  "rosewater-basbousa-cake": {
    title: "بسبوسة بماء الورد",
    shortTitle: "بسبوسة بماء الورد",
    badge: "اختيار الحلى",
    subtitle: "كيكة سميد ناعمة برائحة ماء الورد.",
    excerpt: "بسبوسة ذهبية مشبعة بالشيرة ومعطرة بماء الورد بطعم يوازن بين الحلاوة والرائحة الناعمة.",
    author: "ليلي",
    publishedAt: "يناير 2025",
    time: "45 دقيقة",
    prepTime: "15 دقيقة",
    cookTime: "30 دقيقة",
    ingredients: {
      "الخليط": ["سميد", "سكر", "زبادي", "زبدة", "ماء ورد"],
      "الشيرة": ["سكر", "ماء", "ماء ورد", "عصير ليمون"]
    },
    instructions: [
      { title: "تحضير الخليط.", body: "اخلطي المكونات الجافة، ثم أضيفي الزبادي والزبدة المذابة واتركي الخليط يرتاح قليلاً." },
      { title: "الخبز.", body: "افردي الخليط في صينية مبطنة واخبزيه حتى يصبح السطح ذهبياً وواضح اللون." },
      { title: "إضافة الشيرة.", body: "اسكبي شيرة ماء الورد الدافئة فوق البسبوسة الساخنة واتركيها تتشرب قبل التقطيع." }
    ],
    notes: "الأفضل أن تكون الشيرة دافئة وليست باردة وقت ما تنسكب على البسبوسة."
  },
  "zaatar-flatbread-olive-oil-herbs": {
    title: "خبز زعتر بزيت الزيتون والأعشاب",
    shortTitle: "خبز زعتر بالأعشاب",
    badge: "أضيفت حديثاً",
    subtitle: "خبز دافئ ينفع للتمزيق والمشاركة على السفرة.",
    excerpt: "خبز طري مدهون بزيت الزيتون والزعتر، مناسب لموائد المقبلات والغداء السريع.",
    author: "ليلي",
    publishedAt: "مارس 2025",
    time: "25 دقيقة",
    prepTime: "10 دقائق",
    cookTime: "15 دقيقة",
    ingredients: {
      "العجين": ["طحين", "خميرة", "ملح", "ماء"],
      "الوجه": ["زيت زيتون", "زعتر"]
    },
    instructions: [
      { title: "تحضير العجين.", body: "اخلطي عجينة طرية واتركيها تختمر حتى تصير خفيفة ومنتفخة." },
      { title: "التشكيل والإضافة.", body: "افردي العجين دوائر وادهنيه بسخاء بزيت الزيتون والزعتر." },
      { title: "الخبز.", body: "اخبزيه أو اطهيه على صاج حتى ينتفخ وتظهر عليه لمسات تحمير خفيفة." }
    ],
    notes: "قدميه دافئاً مع اللبنة أو مع الشوربات."
  },
  "kunafa-ashta-orange-blossom": {
    title: "كنافة بالقشطة وماء الزهر",
    shortTitle: "كنافة بالقشطة وماء الزهر",
    badge: "أضيفت حديثاً",
    subtitle: "مقرمشة وكريمية ومعطرة بماء الزهر.",
    excerpt: "حلى صينية غني يجمع بين قرمشة الكنافة وحشوة قشطة ناعمة ونكهة عطرية هادئة.",
    author: "ليلي",
    publishedAt: "مارس 2025",
    time: "55 دقيقة",
    prepTime: "25 دقيقة",
    cookTime: "30 دقيقة",
    ingredients: {
      "القاعدة": ["كنافة", "زبدة"],
      "الحشوة": ["قشطة", "ماء زهر"],
      "الشيرة": ["سكر", "ماء"]
    },
    instructions: [
      { title: "تغليف الكنافة بالزبدة.", body: "فككي خيوط الكنافة وقلبيها جيداً مع الزبدة المذابة." },
      { title: "الطبقات والحشوة.", body: "اضغطي نصف الكنافة في الصينية، أضيفي الحشوة، ثم غطيها بباقي الكنافة." },
      { title: "الخبز والشيرة.", body: "اخبزيها حتى تكتسب لوناً ذهبياً، ثم اسكبي عليها الشيرة الدافئة قبل التقديم." }
    ],
    notes: "ألذ شيء لما تنقدم دافئة مع رشة فستق فوقها."
  },
  "shakshuka-feta-fresh-herbs": {
    title: "شكشوكة بالفيتا والأعشاب الطازجة",
    shortTitle: "شكشوكة بالفيتا والأعشاب",
    badge: "اختيار الفطور",
    subtitle: "بيض طري داخل صلصة طماطم متبلة بشكل دافئ.",
    excerpt: "فطور بالمقلاة مع بيض نصف استواء وفيتا وأعشاب، ويكمل معه خبز مقرمش على الجنب.",
    author: "ليلي",
    publishedAt: "فبراير 2025",
    time: "30 دقيقة",
    prepTime: "10 دقائق",
    cookTime: "20 دقيقة",
    ingredients: {
      "الأساس": ["طماطم", "بصل", "ثوم", "كمون"],
      "الإنهاء": ["بيض", "جبنة فيتا", "أعشاب طازجة"]
    },
    instructions: [
      { title: "تحضير الصلصة.", body: "حمري البصل والثوم، ثم اتركي الطماطم تتسبك مع البهارات الدافئة." },
      { title: "إضافة البيض.", body: "اعملي فجوات صغيرة واكسري فيها البيض، ثم غطي المقلاة حتى يصل البيض للدرجة التي تحبينها." },
      { title: "اللمسة الأخيرة.", body: "وزعي الفيتا والأعشاب وقدمي الطبق مباشرة من المقلاة." }
    ],
    notes: "ملعقة صغيرة من شطة مقرمشة تضيف لها لمسة جميلة."
  },
  "spiced-chicken-ouzi-saffron-rice": {
    title: "أوزي دجاج متبل مع أرز بالزعفران",
    shortTitle: "أوزي دجاج بالأرز والزعفران",
    badge: "وليمة مناسبات",
    subtitle: "أرز معطر ودجاج متبل ومكسرات محمصة.",
    excerpt: "طبق احتفالي من الأرز المتبل مع المكسرات والدجاج الطري، مناسب للعزائم والجمعات الكبيرة.",
    author: "ليلي",
    publishedAt: "ديسمبر 2024",
    time: "ساعة و40 دقيقة",
    prepTime: "25 دقيقة",
    cookTime: "ساعة و15 دقيقة",
    ingredients: {
      "الدجاج": ["دجاجة كاملة", "بهارات مشكلة", "زبدة"],
      "الأرز": ["أرز بسمتي", "زعفران", "مرق", "مكسرات محمصة"]
    },
    instructions: [
      { title: "تتبيل الدجاج.", body: "افركي الدجاج بالبهارات ثم حمريه في الفرن حتى ينضج ويأخذ لوناً جميلاً." },
      { title: "طهي الأرز.", body: "اطبخي الأرز البسمتي مع المرق والزعفران والمنكهات حتى يستوي ويتشرب النكهة." },
      { title: "التقديم.", body: "رصي الأرز في طبق تقديم كبير، ثم ضعي فوقه الدجاج والمكسرات وقدميه مباشرة." }
    ],
    notes: "طبق مثالي لعشاء عائلي كبير أو عزيمة مريحة."
  },
  "lamb-chickpea-stew-turmeric": {
    title: "يخنة لحم وحمص بالكركم",
    shortTitle: "يخنة لحم وحمص بالكركم",
    badge: "طبق دافئ ومريح",
    subtitle: "يخنة مشبعة تناسب الأجواء الأبرد.",
    excerpt: "لحم طري مع حمص ومرق متبل بالكركم يطلع بطبق ذهبي ومريح من أول لقمة.",
    author: "ليلي",
    publishedAt: "نوفمبر 2024",
    time: "ساعة و20 دقيقة",
    prepTime: "20 دقيقة",
    cookTime: "ساعة",
    ingredients: {
      "اليخنة": ["لحم", "حمص", "بصل", "كركم", "مرق"]
    },
    instructions: [
      { title: "تحمير اللحم.", body: "حمري قطع اللحم حتى تأخذ لوناً واضحاً من كل الجهات." },
      { title: "الطهي.", body: "أضيفي البصل والبهارات والحمص والمرق واتركيها على نار هادئة حتى يطرى اللحم." },
      { title: "التقديم.", body: "أنهيها بالأعشاب وقدميها مع الأرز أو الخبز." }
    ],
    notes: "طعمها في اليوم الثاني ألذ."
  },
  "maamoul-date-cookies-rosewater": {
    title: "معمول تمر بماء الورد",
    shortTitle: "معمول تمر بماء الورد",
    badge: "خبزات الأعياد",
    subtitle: "حبات ناعمة بحشوة تمر طرية.",
    excerpt: "معمول السميد التقليدي بحشوة تمر متبلة ولمسة ماء ورد خفيفة تناسب الضيافة.",
    author: "ليلي",
    publishedAt: "ديسمبر 2024",
    time: "50 دقيقة",
    prepTime: "30 دقيقة",
    cookTime: "20 دقيقة",
    ingredients: {
      "العجين": ["سميد", "زبدة", "ماء ورد"],
      "الحشوة": ["تمر", "قرفة", "زبدة"]
    },
    instructions: [
      { title: "تحضير العجين.", body: "اخلطي عجينة السميد واتركيها ترتاح حتى تصير لينة وسهلة التشكيل." },
      { title: "الحشو والتشكيل.", body: "احشيها بالتمر وشكليها في قالب المعمول أو بيدك." },
      { title: "الخبز.", body: "اخبزيها حتى يصبح لونها ذهبياً خفيفاً، ويمكنك إنهاؤها بسكر ناعم إذا رغبت." }
    ],
    notes: "احتفظي بها في علبة محكمة إذا ناوية تقدمينها كهدية."
  },
  "light-herb-lentil-soup": {
    title: "شوربة عدس خفيفة بالأعشاب",
    shortTitle: "شوربة عدس خفيفة",
    badge: "شوربة سريعة",
    subtitle: "شوربة عدس ليمونية خفيفة ولمسة أعشاب طازجة.",
    excerpt: "شوربة مناسبة لأيام الأسبوع، فيها عدس أحمر وكمون وليمون وأعشاب تعطيها خفة وطعماً واضحاً.",
    author: "ليلي",
    publishedAt: "يناير 2025",
    time: "35 دقيقة",
    prepTime: "10 دقائق",
    cookTime: "25 دقيقة",
    ingredients: {
      "الشوربة": ["عدس أحمر", "بصل", "ثوم", "كمون", "مرق", "ليمون"]
    },
    instructions: [
      { title: "تشويح البداية.", body: "حمري البصل والثوم حتى يلين، ثم أضيفي البهارات." },
      { title: "الطهي.", body: "أضيفي العدس والمرق واتركي الشوربة حتى يذوب العدس ويثقل القوام." },
      { title: "اللمسة الأخيرة.", body: "اخلطيها قليلاً إذا رغبت، ثم أنعشيها بالليمون والأعشاب." }
    ],
    notes: "رشة زيت زيتون مع خبز دافئ على الجنب تكملها."
  }
};

function localizeCollectionDescription(title, locale) {
  const safeLocale = normalizeLocale(locale);
  return collectionDescriptions[title]?.[safeLocale] || title;
}

function localizeRecipe(recipe, locale = "en") {
  const safeLocale = normalizeLocale(locale);

  if (safeLocale !== "ar") {
    return recipe;
  }

  const localized = arabicRecipeContent[recipe.slug];

  if (!localized) {
    return recipe;
  }

  return {
    ...recipe,
    ...localized
  };
}

export function getCollectionCards(locale = "en") {
  return collectionCards.map((card) => ({
    ...card,
    description: localizeCollectionDescription(card.title, locale)
  }));
}

export function getAllRecipes(locale = "en") {
  return recipeCollection.map((recipe) => localizeRecipe(recipe, locale));
}

export function getRecipeBySlug(slug, locale = "en") {
  const recipe = recipeCollection.find((entry) => entry.slug === slug);
  return recipe ? localizeRecipe(recipe, locale) : undefined;
}

export function getRecipesByCategory(category, locale = "en") {
  if (!category || category === "All") {
    return getAllRecipes(locale);
  }

  return recipeCollection
    .filter((recipe) => recipe.categories.includes(category) || recipe.category === category)
    .map((recipe) => localizeRecipe(recipe, locale));
}

export function getRecipesByCollection(collection, locale = "en") {
  if (!collection) {
    return getAllRecipes(locale);
  }

  return recipeCollection.filter((recipe) => recipe.collection === collection).map((recipe) => localizeRecipe(recipe, locale));
}

export function searchRecipes(recipes, query) {
  if (!query) {
    return recipes;
  }

  const normalizedQuery = query.toLowerCase();

  return recipes.filter((recipe) => {
    return (
      recipe.title.toLowerCase().includes(normalizedQuery) ||
      recipe.excerpt.toLowerCase().includes(normalizedQuery) ||
      recipe.categories.some((category) => category.toLowerCase().includes(normalizedQuery)) ||
      Object.values(recipe.ingredients)
        .flat()
        .some((ingredient) => ingredient.toLowerCase().includes(normalizedQuery))
    );
  });
}

export function getFeaturedRecipes(locale = "en") {
  return recipeCollection.slice(0, 3).map((recipe) => localizeRecipe(recipe, locale));
}

export function getNewestRecipes(locale = "en") {
  return recipeCollection.slice(3, 6).map((recipe) => localizeRecipe(recipe, locale));
}

export function getRelatedRecipes(slugs = [], locale = "en") {
  return slugs.map((slug) => getRecipeBySlug(slug, locale)).filter(Boolean);
}

export const locales = ["en", "ar"];
export const defaultLocale = "en";

export function isValidLocale(locale) {
  return locales.includes(locale);
}

export function normalizeLocale(locale) {
  return isValidLocale(locale) ? locale : defaultLocale;
}

export function getDirection(locale) {
  return normalizeLocale(locale) === "ar" ? "rtl" : "ltr";
}

function splitHrefParts(href) {
  const match = href.match(/^([^?#]*)(.*)$/);

  return {
    pathname: match?.[1] || href,
    suffix: match?.[2] || ""
  };
}

export function stripLocaleFromPath(pathname = "/") {
  const cleanPath = pathname || "/";
  const segments = cleanPath.split("/");
  const maybeLocale = segments[1];

  if (!isValidLocale(maybeLocale)) {
    return cleanPath;
  }

  const nextPath = `/${segments.slice(2).join("/")}`.replace(/\/+/g, "/");
  return nextPath === "/" ? "/" : nextPath.replace(/\/$/, "") || "/";
}

export function localizeHref(locale, href = "/") {
  if (!href || typeof href !== "string") {
    return href;
  }

  if (
    href.startsWith("http://") ||
    href.startsWith("https://") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:") ||
    href.startsWith("#")
  ) {
    return href;
  }

  const safeLocale = normalizeLocale(locale);
  const { pathname, suffix } = splitHrefParts(href);
  const normalizedPath = stripLocaleFromPath(pathname.startsWith("/") ? pathname : `/${pathname}`);

  return normalizedPath === "/" ? `/${safeLocale}${suffix}` : `/${safeLocale}${normalizedPath}${suffix}`;
}

export function switchLocalePath(pathname, nextLocale) {
  return localizeHref(nextLocale, stripLocaleFromPath(pathname || "/"));
}

const categoryLabels = {
  All: { en: "All", ar: "الكل" },
  Mains: { en: "Mains", ar: "الأطباق الرئيسية" },
  Salads: { en: "Salads", ar: "السلطات" },
  Desserts: { en: "Desserts", ar: "الحلويات" },
  Breakfast: { en: "Breakfast", ar: "الفطور" },
  Soups: { en: "Soups", ar: "الشوربات" },
  Stews: { en: "Stews", ar: "اليخنات" },
  "Middle Eastern": { en: "Middle Eastern", ar: "شرق أوسطي" },
  Celebration: { en: "Celebration", ar: "مناسبات" },
  Fresh: { en: "Fresh", ar: "منعش" },
  Quick: { en: "Quick", ar: "سريع" },
  Bread: { en: "Bread", ar: "خبز" },
  Breads: { en: "Breads", ar: "أنواع الخبز" },
  Bakes: { en: "Bakes", ar: "مخبوزات" },
  Rice: { en: "Rice", ar: "أرز" },
  Comfort: { en: "Comfort", ar: "أكلات مريحة" },
  Cookies: { en: "Cookies", ar: "كوكيز" },
  "Light Meals": { en: "Light Meals", ar: "وجبات خفيفة" },
  Weeknight: { en: "Weeknight", ar: "وسط الأسبوع" },
  Drinks: { en: "Drinks", ar: "المشروبات" },
  Ramadan: { en: "Ramadan", ar: "رمضان" }
};

const collectionLabels = {
  "Ramadan Table": { en: "Ramadan Table", ar: "مائدة رمضان" },
  "Light Meals": { en: "Light Meals", ar: "وجبات خفيفة" },
  "Desserts to Try": { en: "Desserts to Try", ar: "حلويات للتجربة" },
  "Weeknight Comfort": { en: "Weeknight Comfort", ar: "راحة منتصف الأسبوع" },
  "Easy Breakfast": { en: "Easy Breakfast", ar: "فطور سهل" }
};

const difficultyLabels = {
  Easy: { en: "Easy", ar: "سهل" },
  Medium: { en: "Medium", ar: "متوسط" },
  Hard: { en: "Hard", ar: "صعب" }
};

export function translateCategory(name, locale) {
  const safeLocale = normalizeLocale(locale);
  return categoryLabels[name]?.[safeLocale] || name;
}

export function translateCollection(name, locale) {
  const safeLocale = normalizeLocale(locale);
  return collectionLabels[name]?.[safeLocale] || name;
}

export function translateDifficulty(name, locale) {
  const safeLocale = normalizeLocale(locale);
  return difficultyLabels[name]?.[safeLocale] || name;
}

const messages = {
  en: {
    brand: "Lilly Kitchen",
    nav: {
      home: "Home",
      recipes: "Recipes",
      categories: "Categories",
      collections: "Collections",
      about: "About",
      saved: "Saved",
      search: "Search",
      menu: "Menu",
      account: "Account",
      login: "Log In",
      signup: "Sign Up",
      signOut: "Sign Out",
      savedRecipes: "Saved Recipes",
      folders: "Folders",
      welcome: "Welcome to Lilly Kitchen",
      accountSettings: "Account settings",
      searchPlaceholder: "Search recipes...",
      searchAria: "Search recipes",
      menuToggle: "Toggle navigation menu",
      accountAria: "Account",
      primaryNav: "Primary",
      mobileNav: "Mobile"
    },
    language: {
      label: "Language",
      english: "EN",
      arabic: "AR"
    },
    footer: {
      description:
        "Simple ingredients. Honest cooking. Recipes made to be shared, from Lilly's kitchen to yours.",
      explore: "Explore",
      allRecipes: "All Recipes",
      categories: "Categories",
      collections: "Collections",
      account: "Account",
      signUp: "Sign Up",
      logIn: "Log In",
      savedRecipes: "Saved Recipes",
      folders: "Folders",
      about: "About",
      ourStory: "Our Story",
      instagram: "Instagram",
      madeBy: "Made by Blueprint"
    },
    home: {
      viewRecipe: "View Recipe →",
      scroll: "Scroll",
      introQuote: "Simple ingredients. Honest cooking. Recipes made to be shared.",
      byLilly: "By Lilly",
      byline: "Dubai-based food creator · @lilly.kitchen1",
      featured: "Featured This Week",
      viewAll: "View All →",
      craving: "What are you craving?",
      justAdded: "Just Added",
      loadMore: "Load More Recipes",
      seasonal: "Seasonal Collection",
      ramadanTitle: "Ramadan Table",
      ramadanDescription:
        "Thirty days of meaningful meals. From predawn suhoor to iftar spreads that gather the family.",
      exploreCollection: "Explore Collection →",
      instagramTitle: "Follow Along on Instagram",
      instagramSub: "128k followers · New recipes every week",
      followInstagram: "Follow on Instagram ↗",
      newsletterTitle: "New recipes, every week.",
      newsletterSub: "Join home cooks who get Lilly's recipes in their inbox.",
      newsletterFine: "No spam. Unsubscribe anytime.",
      subscribe: "Subscribe",
      emailPlaceholder: "your@email.com",
      instagramPost: "Instagram post"
    },
    recipes: {
      eyebrow: "Recipe Library",
      title: "All Recipes",
      subtitle: "Browse editorial recipes, seasonal collections, and the dishes Lilly returns to most.",
      sortLatest: "Sort: Latest",
      searchPlaceholder: "Search recipes, ingredients, occasions...",
      search: "Search",
      results: "Showing",
      recipes: "recipes",
      recipe: "recipe",
      in: "in",
      for: "for",
      matching: "matching",
      loadMore: "Load More Recipes"
    },
    categoriesPage: {
      eyebrow: "Browse",
      title: "Categories",
      subtitle: "Jump into the section that matches what you are craving right now."
    },
    collectionsPage: {
      eyebrow: "Seasonal and Editorial",
      title: "Collections",
      subtitle: "Grouped stories, occasions, and moods built from Lilly's recipes.",
      active: "Active Collection",
      included: "recipes are currently included in this collection.",
      viewRecipes: "View Recipes →"
    },
    aboutPage: {
      eyebrow: "About Lilly Kitchen",
      title: "A recipe home built from shared tables.",
      subtitle:
        "Lilly Kitchen turns food stories into a browseable cookbook experience with warm visuals and clear cooking flows.",
      warmth: "Editorial warmth",
      warmthBody:
        "The platform is designed to feel like an open cookbook on a bright kitchen counter, calm, tactile, and made for lingering.",
      saving: "Built for saving",
      savingBody:
        "Recipes can be saved, organised into folders, and revisited later without losing the emotional feel of the original post.",
      explore: "Start exploring",
      exploreBody:
        "Browse the current recipe library, seasonal collections, or sign in to begin building your own saved dashboard.",
      browseRecipes: "Browse Recipes →"
    },
    recipeDetail: {
      by: "By",
      reviews: "reviews",
      prep: "Prep",
      cook: "Cook",
      serves: "Serves",
      difficulty: "Difficulty",
      method: "Method",
      notes: "Lilly's Notes",
      originalInstagram: "Original Instagram Post",
      instagramCaption: "This dish has been living on my table for weeks. Recipe now live on Lilly Kitchen.",
      viewInstagram: "View on Instagram ↗",
      related: "You Might Also Like"
    },
    actions: {
      saved: "♥ Saved",
      saveRecipe: "🔖 Save Recipe",
      print: "🖨 Print",
      share: "📤 Share",
      removed: "Recipe removed from saved recipes.",
      savedMessage: "Recipe saved to your account.",
      signInNeeded: "You need to sign in to save recipes.",
      copied: "Recipe link copied to your clipboard.",
      shareError: "Unable to share this recipe right now.",
      shareTitle: "Lilly Kitchen Recipe"
    },
    ingredients: {
      title: "Ingredients",
      servings: "servings",
      copy: "📋 Copy ingredients list"
    },
    login: {
      eyebrow: "Welcome Back",
      title: "Login",
      subtitle: "Sign in to access your saved recipes, folders, and account details.",
      email: "Email",
      password: "Password",
      forgot: "Forgot your password?",
      sending: "Sending reset link...",
      signIn: "Sign In",
      signingIn: "Signing in...",
      needAccount: "Need an account?",
      createOne: "Create one here",
      resetSent: "We sent a password reset link to your email. Open it and choose a new password.",
      enterEmail: "Enter your email address first so we know where to send the reset link.",
      success: "Signed in successfully. Redirecting to your account.",
      confirmEmail: "Please confirm your email using the link we sent, then try signing in again.",
      signInError: "Unable to sign in.",
      resetError: "Unable to send password reset email.",
      passwordPlaceholder: "Enter your password"
      ,
      emailPlaceholder: "you@example.com"
    },
    signup: {
      eyebrow: "Create Account",
      title: "Sign Up",
      subtitle: "Create an account to save recipes, build folders, and return to favourites later.",
      fullName: "Full name",
      email: "Email",
      password: "Password",
      create: "Create Account",
      creating: "Creating account...",
      alreadyRegistered: "Already registered?",
      signInHere: "Sign in here",
      fullNamePlaceholder: "Lilly Kitchen User",
      passwordPlaceholder: "Create a password",
      emailPlaceholder: "you@example.com",
      success: "Account created. We sent a confirmation link to your email. Please verify your email, then sign in.",
      error: "Unable to create account."
    },
    reset: {
      eyebrow: "Account Recovery",
      title: "Reset Password",
      subtitle: "Choose a new password for your Lilly Kitchen account.",
      newPassword: "New password",
      confirmPassword: "Confirm new password",
      save: "Save new password",
      saving: "Saving...",
      backTo: "Back to",
      login: "login",
      passwordTooShort: "Your new password must be at least 6 characters long.",
      mismatch: "Your new password and confirmation do not match.",
      success: "Your password has been reset. Redirecting to login...",
      error: "Unable to reset password. Open the reset link from your email again and try once more.",
      enterPasswordPlaceholder: "Enter a new password",
      confirmPasswordPlaceholder: "Confirm your new password"
    },
    account: {
      eyebrow: "Profile",
      title: "Account",
      subtitle: "View your session, update profile details, and manage your Lilly Kitchen account.",
      noSession: "No active session.",
      manageAccount: "Log in",
      noSessionSuffix: "to manage your account.",
      loading: "Loading account...",
      accountSettings: "Account settings",
      member: "Lilly Kitchen Member",
      profile: "Profile",
      profileDesc: "Update the name shown across your Lilly Kitchen account.",
      fullName: "Full name",
      displayName: "Your display name",
      saveChanges: "Save changes",
      emailTitle: "Email",
      emailDesc: "Change your email address. We will send a confirmation link to the new inbox.",
      emailAddress: "Email address",
      emailPlaceholder: "you@example.com",
      updateEmail: "Update email",
      updating: "Updating...",
      passwordTitle: "Password",
      passwordDesc: "Choose a new password for your account. Use at least 6 characters.",
      newPassword: "New password",
      confirmPassword: "Confirm new password",
      enterPassword: "Enter a new password",
      confirmNewPassword: "Confirm your new password",
      updatePassword: "Update password",
      accountActions: "Account actions",
      accountActionsDesc: "Sign out on this device or permanently delete your account and saved data.",
      signOut: "Sign Out",
      deleteAccount: "Delete Account",
      deleting: "Deleting...",
      saving: "Saving...",
      loadError: "Unable to load account details.",
      profileUpdated: "Profile updated.",
      profileError: "Unable to update profile.",
      emailUpdated: "We sent a confirmation link to your new email address. Please confirm the change from your inbox.",
      emailError: "Unable to update email.",
      signedOut: "Signed out successfully.",
      signOutError: "Unable to sign out.",
      passwordTooShort: "Your new password must be at least 6 characters long.",
      passwordMismatch: "Your new password and confirmation do not match.",
      passwordUpdated: "Password updated successfully.",
      passwordError: "Unable to update password.",
      deleteConfirm: "Are you sure you want to permanently delete your Lilly Kitchen account? This cannot be undone.",
      deleted: "Your account has been deleted.",
      deleteError: "Unable to delete account."
    },
    folders: {
      eyebrow: "Collections",
      title: "My Folders",
      subtitle: "Organize your saved recipes into custom collections.",
      sortCount: "Folders",
      loginRequired: "You need to",
      loginLink: "log in",
      loginSuffix: "before using folders.",
      createTitle: "Create New Folder",
      createIntro: "Name your collection and start organizing saved recipes.",
      folderName: "Folder name",
      folderNamePlaceholder: "Ramadan Recipes",
      description: "Description",
      descriptionPlaceholder: "Optional notes for this folder",
      creating: "Creating...",
      createAction: "Create Folder",
      gridTitle: "Folder Grid",
      loading: "Loading folders...",
      empty: "No folders yet.",
      openFolder: "Open folder",
      delete: "Delete",
      createdMessage: "Folder created.",
      deletedMessage: "Folder deleted.",
      loadError: "Unable to load folders.",
      createError: "Unable to create folder.",
      deleteError: "Unable to delete folder."
    },
    folderDetail: {
      eyebrow: "Folder Detail",
      fallbackTitle: "Folder",
      subtitle: "Review and revisit the recipes saved into this collection.",
      addMore: "+ Add More Recipes",
      loginRequired: "You need to",
      loginLink: "log in",
      loginSuffix: "before viewing a folder.",
      loading: "Loading folder...",
      empty: "This folder does not contain any saved recipes yet.",
      loadError: "Unable to load this folder."
    },
    saved: {
      eyebrow: "Saved Dashboard",
      title: "My Saved Recipes",
      subtitle: "Collect recipes you love, then organize them into folders for later.",
      newFolder: "+ New Folder",
      stats: "Saved Recipes",
      statsFolders: "Folders",
      statsSuffix: "Member area ready for curation.",
      loginRequired: "You need to",
      loginLink: "log in",
      loginSuffix: "before using saved recipes.",
      recipeLabel: "Recipe",
      recipePlaceholder: "Choose a recipe",
      folderOptional: "Folder (optional)",
      withoutFolder: "Save without a folder",
      saving: "Saving...",
      saveRecipe: "Save Recipe",
      foldersTitle: "My Folders",
      seeAllFolders: "See All Folders →",
      createNewFolder: "Create New Folder",
      recentlySaved: "Recently Saved",
      loading: "Loading saved recipes...",
      empty: "No saved recipes yet.",
      inFolder: "In",
      savedLabel: "Saved",
      remove: "Remove",
      loadError: "Unable to load saved recipes.",
      saveError: "Unable to save recipe.",
      removeError: "Unable to remove saved recipe.",
      savedMessage: "Recipe saved.",
      removedMessage: "Saved recipe removed."
    }
  },
  ar: {
    brand: "Lilly Kitchen",
    nav: {
      home: "الرئيسية",
      recipes: "الوصفات",
      categories: "التصنيفات",
      collections: "المجموعات",
      about: "عن الموقع",
      saved: "المحفوظات",
      search: "بحث",
      menu: "القائمة",
      account: "الحساب",
      login: "تسجيل الدخول",
      signup: "إنشاء حساب",
      signOut: "تسجيل الخروج",
      savedRecipes: "الوصفات المحفوظة",
      folders: "المجلدات",
      welcome: "أهلاً بك في Lilly Kitchen",
      accountSettings: "إعدادات الحساب",
      searchPlaceholder: "ابحثي عن وصفة...",
      searchAria: "ابحثي في الوصفات",
      menuToggle: "تبديل قائمة التنقل",
      accountAria: "الحساب",
      primaryNav: "التنقل الرئيسي",
      mobileNav: "التنقل على الجوال"
    },
    language: {
      label: "اللغة",
      english: "EN",
      arabic: "AR"
    },
    footer: {
      description:
        "مكونات بسيطة. طبخ صادق. وصفات صُممت لتُشارك، من مطبخ ليلي إلى مائدتك.",
      explore: "استكشف",
      allRecipes: "كل الوصفات",
      categories: "التصنيفات",
      collections: "المجموعات",
      account: "الحساب",
      signUp: "إنشاء حساب",
      logIn: "تسجيل الدخول",
      savedRecipes: "الوصفات المحفوظة",
      folders: "المجلدات",
      about: "عن الموقع",
      ourStory: "قصتنا",
      instagram: "إنستغرام",
      madeBy: "صنع بواسطة Blueprint"
    },
    home: {
      viewRecipe: "عرض الوصفة ←",
      scroll: "مرر",
      introQuote: "مكونات بسيطة. طبخ صادق. وصفات صُممت لتُشارك.",
      byLilly: "من ليلي",
      byline: "صانعة محتوى طعام في دبي · @lilly.kitchen1",
      featured: "مختارات هذا الأسبوع",
      viewAll: "عرض الكل ←",
      craving: "ماذا تشتهين اليوم؟",
      justAdded: "أضيفت حديثاً",
      loadMore: "تحميل المزيد من الوصفات",
      seasonal: "مجموعة موسمية",
      ramadanTitle: "مائدة رمضان",
      ramadanDescription:
        "ثلاثون يوماً من الوجبات ذات المعنى، من السحور المبكر إلى موائد الإفطار التي تجمع العائلة.",
      exploreCollection: "استكشاف المجموعة ←",
      instagramTitle: "تابعينا على إنستغرام",
      instagramSub: "128 ألف متابع · وصفات جديدة كل أسبوع",
      followInstagram: "تابع على إنستغرام ↗",
      newsletterTitle: "وصفات جديدة كل أسبوع.",
      newsletterSub: "انضمي إلى الطهاة المنزليين الذين تصلهم وصفات ليلي إلى بريدهم.",
      newsletterFine: "بدون رسائل مزعجة. يمكنك إلغاء الاشتراك في أي وقت.",
      subscribe: "اشترك",
      emailPlaceholder: "your@email.com",
      instagramPost: "منشور إنستغرام"
    },
    recipes: {
      eyebrow: "مكتبة الوصفات",
      title: "كل الوصفات",
      subtitle: "تصفحي الوصفات التحريرية والمجموعات الموسمية والأطباق التي تعود إليها ليلي دائماً.",
      sortLatest: "الترتيب: الأحدث",
      searchPlaceholder: "ابحثي عن وصفات أو مكونات أو مناسبات...",
      search: "بحث",
      results: "عرض",
      recipes: "وصفات",
      recipe: "وصفة",
      in: "ضمن",
      for: "لفئة",
      matching: "المطابقة لعبارة",
      loadMore: "تحميل المزيد من الوصفات"
    },
    categoriesPage: {
      eyebrow: "تصفح",
      title: "التصنيفات",
      subtitle: "انتقلي مباشرة إلى القسم الذي يناسب ما تشتهينه الآن."
    },
    collectionsPage: {
      eyebrow: "موسمية وتحريرية",
      title: "المجموعات",
      subtitle: "قصص ومناسبات وأجواء مجمعة من وصفات ليلي.",
      active: "المجموعة النشطة",
      included: "وصفات موجودة حالياً في هذه المجموعة.",
      viewRecipes: "عرض الوصفات ←"
    },
    aboutPage: {
      eyebrow: "عن Lilly Kitchen",
      title: "بيت للوصفات بُني من موائد مشتركة.",
      subtitle:
        "تحوّل Lilly Kitchen قصص الطعام إلى تجربة كتاب طبخ قابلة للتصفح بصور دافئة وخطوات واضحة.",
      warmth: "دفء تحريري",
      warmthBody:
        "صُممت المنصة لتشعر وكأنها كتاب طبخ مفتوح على سطح مطبخ مضاء، هادئة وملموسة ومصنوعة للتأمل.",
      saving: "مصممة للحفظ",
      savingBody:
        "يمكن حفظ الوصفات وتنظيمها في مجلدات والعودة إليها لاحقاً دون فقدان إحساس المنشور الأصلي.",
      explore: "ابدئي الاستكشاف",
      exploreBody:
        "تصفحي مكتبة الوصفات الحالية أو المجموعات الموسمية أو سجلي الدخول لتبدئي في بناء لوحتك المحفوظة.",
      browseRecipes: "تصفح الوصفات ←"
    },
    recipeDetail: {
      by: "بواسطة",
      reviews: "تقييماً",
      prep: "التحضير",
      cook: "الطهي",
      serves: "يكفي",
      difficulty: "الصعوبة",
      method: "الطريقة",
      notes: "ملاحظات ليلي",
      originalInstagram: "المنشور الأصلي على إنستغرام",
      instagramCaption: "هذا الطبق حاضر على مائدتي منذ أسابيع. الوصفة الآن متاحة على Lilly Kitchen.",
      viewInstagram: "عرض على إنستغرام ↗",
      related: "قد يعجبك أيضاً"
    },
    actions: {
      saved: "♥ محفوظة",
      saveRecipe: "🔖 احفظ الوصفة",
      print: "🖨 طباعة",
      share: "📤 مشاركة",
      removed: "تمت إزالة الوصفة من المحفوظات.",
      savedMessage: "تم حفظ الوصفة في حسابك.",
      signInNeeded: "تحتاجين إلى تسجيل الدخول لحفظ الوصفات.",
      copied: "تم نسخ رابط الوصفة إلى الحافظة.",
      shareError: "تعذر مشاركة هذه الوصفة الآن.",
      shareTitle: "وصفة Lilly Kitchen"
    },
    ingredients: {
      title: "المكونات",
      servings: "حصص",
      copy: "📋 نسخ قائمة المكونات"
    },
    login: {
      eyebrow: "مرحباً بعودتك",
      title: "تسجيل الدخول",
      subtitle: "سجلي الدخول للوصول إلى وصفاتك المحفوظة ومجلداتك وتفاصيل حسابك.",
      email: "البريد الإلكتروني",
      password: "كلمة المرور",
      forgot: "هل نسيت كلمة المرور؟",
      sending: "جارٍ إرسال رابط التعيين...",
      signIn: "تسجيل الدخول",
      signingIn: "جارٍ تسجيل الدخول...",
      needAccount: "هل تحتاجين إلى حساب؟",
      createOne: "أنشئي واحداً هنا",
      resetSent: "أرسلنا رابط إعادة تعيين كلمة المرور إلى بريدك. افتحيه واختاري كلمة مرور جديدة.",
      enterEmail: "أدخلي بريدك الإلكتروني أولاً حتى نعرف وين نرسل رابط إعادة التعيين.",
      success: "تم تسجيل الدخول بنجاح. جاري تحويلك إلى الحساب.",
      confirmEmail: "فعّلي بريدك من الرابط اللي أرسلناه لك، وبعدها حاولي تسجلين الدخول مرة ثانية.",
      signInError: "تعذر تسجيل الدخول.",
      resetError: "تعذر إرسال رابط إعادة تعيين كلمة المرور.",
      passwordPlaceholder: "أدخلي كلمة المرور",
      emailPlaceholder: "name@example.com"
    },
    signup: {
      eyebrow: "إنشاء حساب",
      title: "إنشاء حساب",
      subtitle: "أنشئي حساباً لحفظ الوصفات وبناء المجلدات والعودة إلى المفضلات لاحقاً.",
      fullName: "الاسم الكامل",
      email: "البريد الإلكتروني",
      password: "كلمة المرور",
      create: "إنشاء الحساب",
      creating: "جارٍ إنشاء الحساب...",
      alreadyRegistered: "هل لديك حساب بالفعل؟",
      signInHere: "سجلي الدخول من هنا",
      fullNamePlaceholder: "مستخدم Lilly Kitchen",
      passwordPlaceholder: "أنشئي كلمة مرور",
      emailPlaceholder: "name@example.com",
      success: "تم إنشاء الحساب. أرسلنا لك رابط تفعيل على البريد الإلكتروني. فعّلي البريد ثم سجلي الدخول.",
      error: "تعذر إنشاء الحساب."
    },
    reset: {
      eyebrow: "استعادة الحساب",
      title: "إعادة تعيين كلمة المرور",
      subtitle: "اختاري كلمة مرور جديدة لحسابك في Lilly Kitchen.",
      newPassword: "كلمة المرور الجديدة",
      confirmPassword: "تأكيد كلمة المرور الجديدة",
      save: "حفظ كلمة المرور الجديدة",
      saving: "جارٍ الحفظ...",
      backTo: "العودة إلى",
      login: "تسجيل الدخول",
      passwordTooShort: "لازم تكون كلمة المرور الجديدة 6 أحرف على الأقل.",
      mismatch: "كلمة المرور الجديدة وتأكيدها غير متطابقين.",
      success: "تم تغيير كلمة المرور. جاري تحويلك إلى تسجيل الدخول...",
      error: "تعذر إعادة تعيين كلمة المرور. افتحي رابط البريد مرة ثانية وحاولي من جديد.",
      enterPasswordPlaceholder: "أدخلي كلمة المرور الجديدة",
      confirmPasswordPlaceholder: "أعيدي كتابة كلمة المرور الجديدة"
    },
    account: {
      eyebrow: "الملف الشخصي",
      title: "الحساب",
      subtitle: "اعرضي جلستك وعدّلي بيانات ملفك الشخصي وأديري حسابك في Lilly Kitchen.",
      noSession: "لا توجد جلسة نشطة.",
      manageAccount: "سجلي الدخول",
      noSessionSuffix: "لإدارة حسابك.",
      loading: "جارٍ تحميل الحساب...",
      accountSettings: "إعدادات الحساب",
      member: "عضو Lilly Kitchen",
      profile: "الملف الشخصي",
      profileDesc: "حدّثي الاسم الظاهر عبر حسابك في Lilly Kitchen.",
      fullName: "الاسم الكامل",
      displayName: "اسم العرض الخاص بك",
      saveChanges: "حفظ التغييرات",
      emailTitle: "البريد الإلكتروني",
      emailDesc: "غيّري بريدك الإلكتروني. سنرسل رابط تأكيد إلى البريد الجديد.",
      emailAddress: "البريد الإلكتروني",
      emailPlaceholder: "name@example.com",
      updateEmail: "تحديث البريد الإلكتروني",
      updating: "جارٍ التحديث...",
      passwordTitle: "كلمة المرور",
      passwordDesc: "اختاري كلمة مرور جديدة لحسابك. استخدمي 6 أحرف على الأقل.",
      newPassword: "كلمة المرور الجديدة",
      confirmPassword: "تأكيد كلمة المرور الجديدة",
      enterPassword: "أدخلي كلمة مرور جديدة",
      confirmNewPassword: "أكدي كلمة المرور الجديدة",
      updatePassword: "تحديث كلمة المرور",
      accountActions: "إجراءات الحساب",
      accountActionsDesc: "سجلي الخروج من هذا الجهاز أو احذفي حسابك وبياناتك المحفوظة نهائياً.",
      signOut: "تسجيل الخروج",
      deleteAccount: "حذف الحساب",
      deleting: "جارٍ الحذف...",
      saving: "جارٍ الحفظ...",
      loadError: "تعذر تحميل بيانات الحساب.",
      profileUpdated: "تم تحديث الملف الشخصي.",
      profileError: "تعذر تحديث الملف الشخصي.",
      emailUpdated: "أرسلنا رابط تأكيد إلى بريدك الجديد. فعّلي التغيير من بريدك الوارد.",
      emailError: "تعذر تحديث البريد الإلكتروني.",
      signedOut: "تم تسجيل الخروج بنجاح.",
      signOutError: "تعذر تسجيل الخروج.",
      passwordTooShort: "لازم تكون كلمة المرور الجديدة 6 أحرف على الأقل.",
      passwordMismatch: "كلمة المرور الجديدة وتأكيدها غير متطابقين.",
      passwordUpdated: "تم تحديث كلمة المرور بنجاح.",
      passwordError: "تعذر تحديث كلمة المرور.",
      deleteConfirm: "متأكدة إنك تبغين حذف حساب Lilly Kitchen نهائياً؟ ما راح تقدرين ترجعينه بعد الحذف.",
      deleted: "تم حذف حسابك.",
      deleteError: "تعذر حذف الحساب."
    },
    folders: {
      eyebrow: "المجلدات",
      title: "مجلداتي",
      subtitle: "نظّمي وصفاتك المحفوظة داخل مجموعات خاصة فيك.",
      sortCount: "عدد المجلدات",
      loginRequired: "لازم",
      loginLink: "تسجلين الدخول",
      loginSuffix: "قبل استخدام المجلدات.",
      createTitle: "إنشاء مجلد جديد",
      createIntro: "سمّي مجموعتك وابدئي رتّبي الوصفات المحفوظة فيها.",
      folderName: "اسم المجلد",
      folderNamePlaceholder: "وصفات رمضان",
      description: "الوصف",
      descriptionPlaceholder: "ملاحظات اختيارية لهذا المجلد",
      creating: "جارٍ الإنشاء...",
      createAction: "إنشاء المجلد",
      gridTitle: "كل المجلدات",
      loading: "جارٍ تحميل المجلدات...",
      empty: "ما عندك أي مجلدات حالياً.",
      openFolder: "فتح المجلد",
      delete: "حذف",
      createdMessage: "تم إنشاء المجلد.",
      deletedMessage: "تم حذف المجلد.",
      loadError: "تعذر تحميل المجلدات.",
      createError: "تعذر إنشاء المجلد.",
      deleteError: "تعذر حذف المجلد."
    },
    folderDetail: {
      eyebrow: "تفاصيل المجلد",
      fallbackTitle: "المجلد",
      subtitle: "ارجعي للوصفات المحفوظة داخل هذا المجلد في أي وقت.",
      addMore: "+ أضيفي وصفات أكثر",
      loginRequired: "لازم",
      loginLink: "تسجلين الدخول",
      loginSuffix: "قبل عرض هذا المجلد.",
      loading: "جارٍ تحميل المجلد...",
      empty: "هذا المجلد ما فيه أي وصفات محفوظة إلى الآن.",
      loadError: "تعذر تحميل هذا المجلد."
    },
    saved: {
      eyebrow: "المحفوظات",
      title: "وصفاتي المحفوظة",
      subtitle: "احفظي الوصفات اللي تعجبك ثم رتّبيها داخل مجلدات للرجوع لها لاحقاً.",
      newFolder: "+ مجلد جديد",
      stats: "وصفات محفوظة",
      statsFolders: "مجلدات",
      statsSuffix: "ومنطقة العضوية جاهزة للترتيب.",
      loginRequired: "لازم",
      loginLink: "تسجلين الدخول",
      loginSuffix: "قبل استخدام المحفوظات.",
      recipeLabel: "الوصفة",
      recipePlaceholder: "اختاري وصفة",
      folderOptional: "المجلد (اختياري)",
      withoutFolder: "احفظيها بدون مجلد",
      saving: "جارٍ الحفظ...",
      saveRecipe: "حفظ الوصفة",
      foldersTitle: "مجلداتي",
      seeAllFolders: "عرض كل المجلدات ←",
      createNewFolder: "إنشاء مجلد جديد",
      recentlySaved: "المحفوظة مؤخراً",
      loading: "جارٍ تحميل الوصفات المحفوظة...",
      empty: "ما عندك أي وصفات محفوظة إلى الآن.",
      inFolder: "داخل",
      savedLabel: "محفوظة",
      remove: "إزالة",
      loadError: "تعذر تحميل الوصفات المحفوظة.",
      saveError: "تعذر حفظ الوصفة.",
      removeError: "تعذر إزالة الوصفة المحفوظة.",
      savedMessage: "تم حفظ الوصفة.",
      removedMessage: "تمت إزالة الوصفة من المحفوظات."
    }
  }
};

export function getDictionary(locale) {
  return messages[normalizeLocale(locale)];
}

from os.path import abspath, join, dirname


class Content:
    def __init__(self):
        
        self.about_us_content: dict= {
            "EN": {
                "whoAreWe": "was founded in 2019. An entity that is responsible for providing traders with the best experience in Forex, and deliver one message: «TRADE ON THE RIGHT WAY».",
                "vision": "- Install the right trading culture in the Middle East as a type of profitable investment that the whole world needs in recent times.\n\n-Reach the best international standards in Forex World.\n\n-Learn how to make money by trading. \n\n- Present comprehensive services in the world of financial markets through various methods that help traders achieve the greatest profit intelligently.\n\n- Spread the West's approach to trading and considering it an investment that must be learned properly to reap the largest profits.",
                "mission": "- Focus on providing quality financial services\n\n- Provide reliable financial advice.\n\n- Create safe and reliable investments.\n\n- Adhere to ethical practices .\n\n- Help clients secure their financial future.\n\n- Provide excellent customer service.\n\n- Teach the public to trade the right way.\n\n- Warning against companies that use the term “trading” in order to delude the public into obtaining large profits without learning.\n\n- Availability of free educational value to teach the basics of trading.\n\n- View the latest trading strategies and share them with traders.",
                "education": "Education",
                "educationContent": "- Online Courses.\n\n- Offline Courses.\n\n- Free educaional content for beginners and advcanced audience.\n\n- Free Webinars.\n\n- Outdoor Events.",
                "informing": "Informing",
                "informingContent": "- Daily News on Our Website and platforms.\n\n- Articles on website.\n\n- Anylsing.\n\n- Weekly Economic Agenda.",
                "trading": "Trading",
                "tradingContent": "- Consulting.\n\n- Recommendatins.\n\n- Open Accounts.\n\n- Competations.",
            },
            "AR": {
                "whoAreWe": "تأسست عام 2019. كيان مسؤول لتزويد المتداولين بأفضل تجربة في الفوركس، وإيصال رسالة واحدة: التداول على الطريق  الصحيح",
                "vision": "-تثبيت  ثقافة التداول الصحيحة في الشرق الأوسط كنوع من الاستثمار المربح الذي يحتاجه العالم كله في الآونة الأخيرة.\n\n-الوصول إلى أفضل المعايير العالمية في عالم الفوركس.\n\n-تعلم كيفية كسب المال عن طريق التداول.\n\n- تقديم خدمات شاملة في عالم المال\n\n- الأسواق من خلال وسائل مختلفة تساعد المتداولين تحقيق أكبر قدر من الربح بذكاء.\n\n- نشر منهج الغرب في التجارة والنظر فيه استثمار يجب تعلمه بشكل صحيح لجني ثماره أكبر الأرباح",
                "mission": "- التركيز على تقديم خدمات مالية عالية الجودة\n\n- تقديم المشورة المالية الموثوقة.\n\n- خلق استثمارات آمنة وموثوقة.\n\n- الالتزام بالممارسات الأخلاقية.\n\n- مساعدة العملاء على تأمين مستقبلهم المالي.\n\n- تقديم خدمة عملاء ممتازة.\n\n- تعليم الجمهور التجارة بالطريقة الصحيحة.\n\n- التحذير من الشركات التي تستخدم مصطلح \"التداول\" بهدف التضليل\n\nالجمهور للحصول على أرباح كبيرة دون التعلم.\n\n- توافر قيمة تعليمية مجانية لتعليم أساسيات التداول.\n\n- عرض أحدث استراتيجيات التداول ومشاركتها مع المتداولين",
                "education": "التعليم",
                "educationContent": "-  دروس مباشرة على الإنترنت.\n\n- دورات أوفلاين.\n\n- محتوى تعليمي مجاني لـ المبتدئين والمتقدمين\n\n- ندوات عبر الإنترنت مجانية.\n\n- الفعاليات الخارجية",
                "informing": "أخبار",
                "informingContent": "- الأخبار اليومية على موقعنا \والمنصات.\n\n- مقالات على الموقع.\n\n- تحليلات.\n\n- الأجندة الاقتصادية الأسبوعية.",
                "trading": "تداول",
                "tradingContent": "-الاستشارة-\n\nالتوصيات.\n\n- حسابات مفتوحة.\n\n- المسابقات.",

            }
        }
        self.global_: dict = {
            "EN": {
                "platformTitle": "Sky Elevators",
                "homeServicesSectionTitle": "Ascend to New Heights",
                "homeSerivceMaintainenceTitle":"Maintenance",
                "homeSerivceMaintainenceBio":"Elevate Your Uptime with Expert Elevator Care Services",
                "homeSerivceSparePartsTitle":"Spare Parts",
                "homeSerivceSparePartsBio":"Quality Spare Parts to Keep Your Elevators Ascending Smoothly",
                "homeSerivceMonitizationsTitle":"Monetization",
                "homeSerivceMonitizationsBio":"Smart Solutions for Elevator Efficiency and Profit Optimization",
                "homeSerivceInstallmentsTitle":"Installations",
                "homeSerivceInstallmentsBio":"Seamless Installations for Elevating Your Spaces Safely",
                "homeServicesSectionBio": "Ride the Future: Elevating Experiences with Cutting-Edge Elevator Solutions",
                "homeBlogSectionTitle": "Our Blog",
                "homeTestmonialsSectionTitle": "Rave Reviews",
                "homeValuesSectionTitle": "Core Elevator Values",
                "homeValuesSectionBio": "Elevating with Integrity, Innovation, and Excellence – Our Pillars of Success",
                "homeValuesSectionValesOne": "Pioneering advancements in elevator technology for enhanced efficiency and reliability.",
                "homeValuesSectionValesTwo": "Ensuring consistent, safe, and dependable elevator solutions for our clients.",
                "homeValuesSectionValesThree": "Committed to understanding and meeting the unique needs of each customer.",
                "homeTestmonialsSectionBio": "Discover what others say about our elevating services and customer satisfaction",
                "homeFreeVisitSectionTitle": "<span>Egypt's First Free On-Site Visit Offer</span><br>Revolutionary Elevator Services",
                "homeFreeVisitSectionBio": "Embark on an unparalleled journey of convenience as we introduce our revolutionary complimentary elevator inspection service, marking a groundbreaking initiative in the thriving landscape of Egypt's elevator industry. At [Your Company Name], we redefine excellence by offering a specialized and entirely free visit service, ensuring your elevators receive meticulous attention and expert care. Trust us to elevate your experience with our commitment to safety, reliability, and unmatched customer service. Discover the future of elevator maintenance – where excellence meets innovation, and your satisfaction is our top priority.",
                "homeShopSectionTitle": "Premium Elevator Parts",
                "homeShopSectionBio": "Elevate your experience with top-quality spare parts for unmatched performance.",
                "footerMsg": "was founded in 2019. An entity that is responsible for providing traders with the best experience in Forex, and deliver one message: «TRADE ON THE RIGHT WAY».",
                "blogWelcomingMsg": "Welcome to <span class='highlighted'>Sky Elevators</span> Blog<br><span class='subtitle'>Where you can find <span class='highlighted'>craft narratives</span> that ignite <span class='highlighted'>inspiration</span>, <span class='highlighted'>knowladge</span>, and <span class='highlighted'>entertainment<span>!</span>",
                "lightToFindUs": "Trade on the right way!",
                "copyrightMsg": "All Copyrights reserved @ Sky Elevators, 2024",
                "contactUsTitle": "Light to <span class='highlighted'>Find Us</span>",
                "contactUsSubtitle": "We will be happy to hear from you!",
                "aboutEntrySectionTitle": "Skyward Journeys",
                "aboutEntrySectionSubtitle": "Elevator Solutions Reaching Every Level",
                "ourStoryTitle": "Our Story",
                "ourStory": "Sky elevators is a leading provider of elevator solutions, aiming to make people flow safe, reliable and convenient.\n\nWe provide superior installation, maintenance and modernization services for all types of elevators in all types of buildings, guaranteeing the highest safety and quality standards.",
                "competitiveEdgeTitle": "Competitive Edge",
                "competitiveEdge": "Our expertise in innovative engineering solutions, which empower us to customize our services to each client’s unique needs.",
                "aboutValuesSectionTitle": "Elevating Trust",
                "aboutValuesSectionSubtitle": "Commitment to Quality & Safety",
                "aboutValuesSectionValuesOneTitle": "Integrity",
                "aboutValuesSectionValuesOneDesc": "Honesty and transparency guide every interaction. Trust us to deliver with ethical practices and clear communication. ",
                "aboutValuesSectionValuesTwoTitle": "Reliability",
                "aboutValuesSectionValuesTwoDesc": "Your project's success is our promise. We ensure timely completion and stay within budget, exceeding expectations.",
                "aboutValuesSectionValuesThreeTitle": "Innovation",
                "aboutValuesSectionValuesThreeDesc": "We embrace cutting-edge technologies to provide the most advanced elevator solutions, pushing boundaries for a smoother ride.",
                "aboutValuesSectionValuesFourTitle": "Safety",
                "aboutValuesSectionValuesFourDesc": "Your well-being is paramount. We adhere to the strictest safety regulations and implement rigorous protocols for every installation.",
                "aboutValuesSectionValuesFiveTitle": "Quality",
                "aboutValuesSectionValuesFiveDesc": "Unwavering commitment to excellence in every aspect. We use premium materials and meticulous craftsmanship for elevators built to last.",
                "aboutValuesSectionValuesSixTitle": "Pioneering",
                "aboutValuesSectionValuesSixDesc": "We lead the industry by constantly seeking advancements. Expect groundbreaking solutions and a dedication to shaping the future of elevators.",
                "meetSkyFounderTile": "Meet Sky Founder & General Manager",
                "meetSkyFounderDescription": "Eng. Mohamed Elsherbiny who has over 25 years of experience in the industry in multinational companies such as Otis and Kone As a director of various areas such as major projects, sales operation, maintenance, and safety",
                "meetSkyFounderDegreesTitle": "Degrees and certifications:",
                "meetSkyFounderDegrees": ["Master’s Degree in business administrations - AAST", "NEBOSH", "Major projects academy- London/Paris", "OSHA", "EHS & quality auditor - middle east and Europe."],
                "aboutQualityCodesTitle": "Unlocking Safety & Performance",
                "aboutQualityCodesSubtitle": "Certifications That Speak Volumes",
                "aboutQualityCodesSnippetOne": "The European code of elevators EN81-20/50",
                "aboutQualityCodesSnippetTwo": "The Egyptian code of elevators 303/2007",
                "aboutQualityCodesSnippetThree": "The worldwide job site safety standard WWJSSS",
                "aboutOurVisionTitle": "New Heights Await",
                "aboutOurVision": 'At Sky Elevators, we envision a future where architectural marvels seamlessly connect with <span class="highlighted">cutting-edge elevator technology</span>, empowering builders and dreamers to reach previously <span class="highlighted">unimagined heights</span>.<br><br>Driven by our <span class="highlighted">unwavering commitment to innovation and expertise</span>, we strive to be the trusted partner for engineers, architects, and project managers, providing <span class="highlighted">customizable, high-quality elevator solutions</span> that elevate more than just people - they elevate possibilities.<br><br>We believe in <span class="highlighted">affordable accessibility</span>, ensuring <span class="highlighted">budget-friendly combined components</span> that never compromise on <span class="highlighted">performance or safety</span>. Our vision isn\'t just about rising higher, it\'s about removing barriers and opening doors to <span class="highlighted">limitless potential</span>.<br><br>Fueled by a <span class="highlighted">competitive edge in innovative engineering solutions</span>, we <span class="highlighted">customize every project to meet unique needs</span>, turning blueprints into soaring realities. By partnering with us, you gain more than just elevators; you gain a team dedicated to your success, committed to pushing boundaries and reaching <span class="highlighted">new heights of excellence, together</span>.\nThis is the Sky Elevators vision. <span class="highlighted">Ascend with us.</span>',
                "installationsEntryTitle": "Elevate Your Space",
                "installationsEntrySubtitle": "Seamlessly integrating technology, sourcing, load capacity, speed, and height for your perfect fit",
                "installationsGearedSectionTitle":"Power & Precision",
                "installationsGearedSectionSubtitle":"Reliable performance, built for lasting durability",
                "installationsGearedSectionStopsLabel":"Up to 12 stops",
                "installationsGearedSectionPeopleLabel":"4 to 8 persons",
                "installationsGearedSectionSpeedLabel":"Up to 1.6 m/sec",
                "installationsGearlessSectionTitle":"Silent Glide, Future Tech",
                "installationsGearlessSectionSubtitle":"Smooth, quiet operation meets energy efficiency",
                "installationsGearlessSectionStopsLabel":"Up to 12 stops",
                "installationsGearlessSectionPeopleLabel":"4 to 8 persons",
                "installationsGearlessSectionSpeedLabel":"Up to 1.6 m/sec",
                "installationsHomeLiftsSectionTitle":"Stylish Home Ascent",
                "installationsHomeLiftsSectionSubtitle":"Seamless accessibility, designed for effortless living",
                "installationsHomeLiftsSectionStopsLabel":"Up to 5 stops",
                "installationsHomeLiftsSectionPeopleLabel":"2 to 4 persons",
                "installationsHomeLiftsSectionSpeedLabel":"1 m/sec0.63 m/sec",
                "installationsHydrolicElevatorsSectionTitle":"Strengthful & Adaptable",
                "installationsHydrolicElevatorsSectionSubtitle":"Powerful lifting, versatile for any space and load",
                "search": "Search",
                "trendingNow": "Trending Now",
                "dontHaveAccount": "Don't have an account? Join us now!",
                "alreadyHaveAccount": "Have an account? Login now!",
                "name": "Name",
                "phoneNumber": "Phone Number",
                "email": "Email",
                "password": "Password",
                "homeEntryMsg": "Ascend to New Heights!",
                "mostRecent": "Most Recent",
                "allArticles": "All Articles",
                "random": "Random",
                "all": "All",
                "ourLatestArticles": "Our Latest Articles",
                "ourArticles": "Our Articles",
                "featured": "Featured",
                "trending": "Trending",
                "ourBestWriters": "Our best <br><span>Writers</span>",
                "incaseYouMissed": "In Case You Missed!",
                "incaseYouMissedMsg": "In case you missed these articles, Check them out now!",
                "randomArticles": "Random Articles!",
                "randomArticlesMsg": "Based on your pervious choises, We've picked these articles for you!",
                "wannaJoinUs": "Curious about<br><span> Joining Us</span>",
                "applications": "Applications",
                "le": "L.E.",
                "classification": "Classification",
                "classifications": "Classifications",
                "category": "Category",
                "categories": "Categories",
                "writer": "Writer",
                "writers": "Writers",
                "articles": "Articles",
                "writtenBy": "Written By",
                "unavailable": "Unavailable",
                "listenMsg": "Listen to the article!",
                "unavailableMsg": "The article audio not available!",
                "shareMsg": "Share this article!",
                "rateMsg": "Rate this article!",
                "commentMsg": "Leave a comment!",
                "whatsYouWantToRead": "You want to read what?",
                "whatsYouWantToReadMsg": "Choose what do you want to read!",
                "filter": "Filter",
                "filterMsg": "Get the exact articles you're searching for!",
                "articleTitle": "Article Title",
                "discoverCategories": "Discover our <span class=\"underline\">Categories</span>",
                "discoverCategoriesMsg": "We've classified our articles to make it easy for you to find what you are searching for!",
                "featuredCategories": "Featured Categories",
                "featuredCategoriesMsg": "We've chosen these categories for you!",
                "allCategories": "All Categories",
                "allCategoriesMsg": "Check out all categories we have!",
                "latestArticles": "Latest Articles",
                "latestArticlesMsg": "Discover the latest articles now!",
                "careers": "Careers",
                "resetYourPassword": "Reset your password",
                "profilePicture": "Profile Picture",
                "coverPicture": "Cover Picture",
                "allCareers": "All Careers",
                "weSearchingForYou": "We're searching for you like you do!",
                "riskwarning": "Risk Warning",
                "riskwarningMsg": "Trading using leverage in the financial markets involves very high risks that are not suitable for all types of investors. You must understand the amount of risk that your money may be exposed to. All opinions, analyses, recommendations and content presented on the site are for general information and should not be taken as a tool for making any investment decisions, whether to buy or sell.",
                "agenda": "Economic Agenda",
                "agendaMsg": "Follow up the news and times that affect marketplaces!",
                "welcomeBack": "Welcome Back",
                "aboutMsg": "Curious about know more about us?",
                "coursesMsg": "Start your journey to \"Trade on the Right way\"!",
                "price": "Price", 
                "sessions": "Sessions",
                "courseContent": "Course Content",
                "students": "Students",
                "next_session": "Next Session",
                "support": "Support",
                "complaint": "Complaint",
                "feedback": "Feedback",
            },
            "AR": {
                "platformTitle": "سكاي",
                "footerMsg": "تأسست عام 2019. كيان مسؤول لتزويد المتداولين بأفضل تجربة في الفوركس، وإيصال رسالة واحدة: التداول على الطريق  الصحيح",
                "lightToFindUs": "تداول على الطريقة الصحيحة!",
                "copyrightMsg": "All Copyrights reserved @ Sky Elevators, 2023",
                "search": "بحث",
                "trendingNow": "شائع الآن",
                "dontHaveAccount": "ليس لديك حساب؟ انضم إلينا الآن!",
                "alreadyHaveAccount": "هل لديك حساب؟ سجل الدخول الآن!",
                "name": "الاسم",
                "phoneNumber": "رقم الهاتف",
                "email": "البريد إلكتروني",
                "password": "كلمة المرور",
                "homeEntryMsg": "أفضل ما في الأسبوع",
                "mostRecent": "الأحدث",
                "allArticles": "جميع المقالات",
                "random": "عشوائي",
                "all": "الكل",
                "ourLatestArticles": "أحدث المقالات",
                "ourArticles": "المقالات",
                "featured": "المُختار",
                "trending": "الشائع",
                "ourBestWriters": "أفضل <br><span>الكُتّاب</span> لدينا",
                "incaseYouMissed": "مقالات ذات صلة",
                "incaseYouMissedMsg": "في حال فاتتك هذه المقالات ، تحقق منها الآن!",
                "randomArticles": "مقالات آخرى!",
                "randomArticlesMsg": "بناءً على اختياراتك السابقة ، اخترنا لك هذه المقالات!!",
                "wannaJoinUs": "مهتم بأن<br><span>تنضم إلينا</span>",
                "applications": "المتقدمين للوظيفة",
                "le": "L.E.",
                "classification": "التصنيف",
                "classifications": "التصنيفات",
                "category": "الفئة",
                "categories": "الفئات",
                "writer": "الكاتب",
                "writers": "الكُتًاب",
                "articles": "المقالات",
                "writtenBy": "كٌتبت بواسطة",
                "unavailable": "غير متوفر",
                "listenMsg": "إستمع إلى المقال!",
                "unavailableMsg": "النسخة الصوتية من المقال غير متوفرة!",
                "shareMsg": "أنشر هذا المقال!",
                "rateMsg": "قيم هذا المقال!",
                "commentMsg": "اترك تعليقاً!",
                "whatsYouWantToRead": "ماذا تريد أن تقرأ؟",
                "whatsYouWantToReadMsg": "اختر ما تريد قراءته!",
                "filter": "بحث",
                "filterMsg": "احصل على المقالات التي تبحث عنها!",
                "articleTitle": "عنوان المقال",
                "discoverCategories": "تفقد <span class=\"underline\">الفئات</span> التي نتناولها",
                "discoverCategoriesMsg": "لقد قمنا بتصنيف مقالاتنا لتسهيل العثور على ما تبحث عنه!",
                "featuredCategories": "الفئات المختارة",
                "featuredCategoriesMsg": "الفئات التي قمنا بإختيارها لك!",
                "allCategories": "الفئات",
                "allCategoriesMsg": "تفقد جميع الفئات التي نتناولها",
                "latestArticles": "أحدث المقالات",
                "latestArticlesMsg": "تفقد أخر المقالات المنشورة!",
                "careers": "الوظائف",
                "resetYourPassword": "إسترجع كلمة مرور حسابك",
                "profilePicture": "الصورة الشخصية",
                "coverPicture": "صورة الغلاف",
                "allCareers": "جميع الوظائف",
                "weSearchingForYou": "نحن نبحث عنك كما تفعل!",
                "riskwarning": "تحذير المخاطرة",
                "riskwarningMsg": "المتاجرة باستخدام الروافع المالية في أسواق المال ينطوي عليها مخاطر عالية جدًا لا تتناسب مع جميع أنواع المستثمرين، يجب عليك أن تستوعب حجم المخاطرة التي قد تتعرض لها أموالك. جميع ما يطرح في الموقع من آراء وتحليلات وتوصيات ومحتويات هو من باب المعلومات العامة ولا يجب أن يتخذ كأداة لاتخاذ أي قرارات استثمارية بالبيع أو الشراء. ",
                "agenda": "الأجندة الإقتصادية",
                "agendaMsg": "تابع الأخبار والمواقيت التي ترثؤ على الأسواق المالية!!",
                "welcomeBack": "أهلاً بعودتك",
                "aboutMsg": "مهتم أن تعرف المزيد عن من نكون؟",
                "coursesMsg": "أبدأ رحلتك في التداول بالطريقة الصحيحة",
                "price": "السعر", 
                "sessions": "المحاضرات",
                "courseContent": "محتوى الدورة",
                "students": "عدد الطلاب",
                "next_session": "المحاضرة القادمة"
            }
        }

        self.tabs: dict = {
            "EN": {
                "home": "Home",
                "maintenance": "Maintenance",
                "spareParts": "Spare Parts",
                "monetization": "Monetization",
                "installations": "Installations",
                "blog": "Blog",
                "articles": "Articles",
                "tools": "Tools",
                "contact": "Contact",
                "aboutUs": "About Us",
                "profile": "Profile",
                "termsAndConditions": "Terms and Conditions",
                "privacyPolicy": "Privacy Policy",
                "shippingAndReturn": "Shipping and Return",
                "contact": "Contact",
                "contactUs": "Contact Us",
            },
            "AR": {
                "home": "الرئيسية",
                "courses": "الدورات",
                "articles": "المقالات",
                "tools": "الأدوات",
                "categories": "الفئات",
                "careers": "الوظائف",
                "audioArticles": "المقالات الصوتية",
                "aboutUs": "نبذة عنا",
                "classification": "التصنيفات",
                "passwordReset": "إستعادة كلمة المرور",
                "profile": "الصفحة الشخصية",
                "agenda": "الأجندة الإقتصادية"
            }
        }

        self.actions: dict = {
            "EN": {
                "login": "Login",
                "signup": "Sign Up",
                "seeMore": "See more",
                "getYoursNow": "Get Yours Now",
                "elevateYourExperience": "Elevate Your Experience",
                "rememberMe": "Remember me",
                "forgetPassword": "Forget Password?",
                "seeAllArticles": "See all articles",
                "seeMyArticles": "See My Articles",
                "seeAllJobs": "See All Jobs",
                "apply": "Apply",
                "applyNow": "Apply Now",
                "listen": "Listen",
                "share": "Share",
                "rate": "Rate",
                "comment": "Comment",
                "shareLinkVia": "Share article via...",
                "shareLink": "Share article's link!",
                "clear": "Clear",
                "findEmail": "Find Email",
                "sendCodeAgain": "Send code again",
                "changeEmail": "Change Email",
                "validateYourEmail": "Validate your email",
                "Validate": "Validate",
                "completeProfile": "Complete Profile",
                "submit": "Submit",
                "cancel": "Cancel",
                "checkThisOut": "Check this out!",
                "goBack": "Go Back",
                "continueCourse": "Continue Course",
                "enrollNow": "Enroll Now",
                "addToWishlist": "Add to wishlist",
                "seeRelativeArticles": "Relative Articles",
                "readArticle": "Read",
                "add": "Add",
                "comment": "Comment",
                "requestOption": "Request Option",
                "loading": "Loading...",
                "logout": "Logout",
                "pickPlan": "Pick Plan",
                "moreDetails": "More Details",
            },
            "AR": {
                "login": "تسجيل الدخول",
                "signup": "تسجيل الإشتراك",
                "seeMore": "شاهد المزيد",
                "rememberMe": "تذكرنى",
                "forgetPassword": "نسيت كلمة المرور?",
                "seeAllArticles": "تصفح جميع المقالات",
                "seeMyArticles": "تصفح مقالاتي",
                "seeAllJobs": "تصفح جميع الوظائف",
                "apply": "قدم",
                "applyNow": "قدم الآن",
                "listen": "استمع",
                "share": "شارك",
                "rate": "قيم",
                "comment": "أترك تعليقاً",
                "shareLinkVia": "شارك المقال عن طريق...",
                "shareLink": "شارك رابط المقال",
                "clear": "مسح",
                "findEmail": "البحث عن البريد الإلكتروني",
                "sendCodeAgain": "ارسل الرمز مجددا",
                "changeEmail": "تغيير الايميل",
                "validateYourEmail": "تحقق من صحة بريدك الإلكتروني",
                "Validate": "تحقق",
                "completeProfile": "أكمل الملف الشخصي",
                "submit": "تأكيد",
                "cancel": "إلغاء",
                "checkThisOut": "تحقق من هذا!",
                "goBack": "عُد",
                "continueCourse": "أكمل الدورة",
                "enrollNow": "التحق الآن",
                "addToWishlist": "أضف إلى قائمة الاهتمامات",


            }
        }

        self.placeholders: dict = {
            "EN": {
                "search": "Search by name, keywords, etc...",
                "emailUsernameFieldPlaceholder": "Email Address",
                "emailFieldPlaceholder": "Email Address",
                "nameFieldPlaceholder": "Name",
                "passwordFieldPlaceholder": "Enter your Password!",
                "phoneFieldPlaceholder": "Enter your Phone Number!",
                "repasswordFieldPlaceholder": "Re-enter your Password!",
                "typeYourComment": "Type your comment...!",
                "messageFieldPlaceholder": "Type your message...!",
            }, "AR": {
                "search": "أبحث بالاسم، كلمة مفتاحية، أو آخرى",
                "emailUsernameFieldPlaceholder": "أدخل بريدك الإلكتروني",
                "emailFieldPlaceholder": "البريد الالكتروني",
                "nameFieldPlaceholder": "الاسم",
                "passwordFieldPlaceholder": "أدخل كلمة السر",
                "repasswordFieldPlaceholder": "أعد إدخال كلمة السر",
                "phoneFieldPlaceholder": "أدخل رقم الهاتف",
            }
        }

        self.salary_types: dict = {
            "EN": {
                0: "Per Month",
                1: "Per Task",
                2: "Per Milestone",
                3: "Per Project",
                4: "Long-time Contract",
                5: "Short-time Contract",
            },
            "AR": {
                0: "شهرياً",
                1: "مقابل المهمة",
                2: "مقابل المرحلة",
                3: "مقابل المشروع",
                4: "عقد طويل الأمد",
                5: "عقد قصير الأمد",
            },
        }

        self.job_types: dict = {
            "EN": {
                0: "Full Time",
                1: "Part Time",
                2: "Freelancer",
                3: "Hour Based Rate",
            },
            "AR": {
                0: "دوام كلي",
                1: "دوام جزئي",
                2: "مستقل",
                3: "حسب الوقت اللازم",
            },
        }
        
        self.errors: dict= {
            "EN": {
                "notFound": "Not Found",
                "notFoundMsg": "We didn't found the page or data you're searching for!",
                "internalServerError": "Internal Server Error",
                "internalServerErrorMsg": "There is an error. Try again later!",
                "notValidName": "Please, Enter a valid name!",
                "notValidEmail": "Please, Enter a valid email!",
                "notValidphoneNumber": "Please, Enter a valid phone number!",
                "notValidMessage": "Please, Make your message more detailed!",
                "notMessageOptionSelected": "Please, Select the request option!",
            },
            "AR": {
                "notFound": "غير موجود",
                "notFoundMsg": "لم نعثر على الصفحة أو البيانات التي تبحث عنها!",
                "internalServerError": "خطأ في الخادم الداخلي",
                "internalServerErrorMsg": "هنالك خطأ. حاول مرة أخرى في وقت لاحق!",
            }
        }

        self.agenda: dict= {
            "EN": {
                "event": "Event",
                "current": "Current",
                "pervious": "Pervious",
                "predicted": "Predicted",
                "importance": "Importance",
                "time": "Time",
            },
            "AR": {
                "currency": "العملة",
                "event": "الحدث",
                "current": "الحالي",
                "pervious": "السابق",
                "predicted": "المتوقع",
                "importance": "الأهمية",
                "time": "الوقت",
            }
        }

        self.courses= {
            "EN": {
                "completeSessions": "Completed Sessions",
                "courseCompletion": "Courses Completing",
                "testsPassed": "Tests Passed",
            },
            "AR": {
                "completeSessions": "المحاضرات المكتملة",
                "courseCompletion": "إكمال الدورة",
                "testsPassed": "الاختبارات التي تم تجاوزها",
            },
        }

        self.months= {
            "EN": {
                "January": "January",
                "February": "February",
                "March": "March",
                "April": "April",
                "May": "May",
                "June": "June",
                "July": "July",
                "August": "August",
                "September": "September",
                "October": "October",
                "November": "November",
                "December": "December",
            },
            "AR": {
                "January": "يناير ",
                "February": "فبراير ",
                "March": "مارس ",
                "April": "إبريل ",
                "May": "مايو ",
                "June": "يونيو ",
                "July": "يوليو ",
                "August": "أغسطس ",
                "September": "سبتمبر ",
                "October": "أكتوبر ",
                "November": "نوفمبر ",
                "December": "ديسمبر ",
            },            
        }
        self.status= {
            "EN": {
                "failed": "Failed!",
                "messageSentSuccessfully": "Message Sent Successfully!",
                "tryAgainLater": "Try again later!",
            }
        }
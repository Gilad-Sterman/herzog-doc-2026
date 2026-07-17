import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const content = {
    en: {
        aboutTitle: 'Rabbi Isaac Halevi Herzog',
        about: [
            'Rabbi Isaac Halevi Herzog was born in Poland in 1888, and moved to England with his family when he was nine. His father became the rabbi in Leeds and personally undertook his son\'s intensive religious education rather than sending him to school. Before turning twenty, he received official rabbinical ordination from three leading Talmudic scholars, including the rabbi of Slonim.',
            'Rabbi Herzog\'s education did not cease with his mastery of Talmudic knowledge. He studied at the Sorbonne in Paris and earned a degree in Oriental languages. He earned degrees in classics and mathematics at the University of London, where in July of 1914, at the age of twenty-five, he also received the title Doctor of Letters. Investigating what he called porphyrology, he wrote his thesis on the topic of Tekhelet.',
            'Rabbi Herzog took up the position of rabbi in Belfast in 1916, eventually becoming chief rabbi of Ireland, a position he held until 1937. When Rabbi Abraham Kook, the revered chief rabbi of the British Mandate for Palestine, died in 1935, Rabbi Herzog was elected to become his successor, and held the position from 1937 until 1948, when the UN partitioned the British Mandate and created Israel. He then served as the chief rabbi of the State of Israel until his death in 1959. Statesman, rabbinic sage, ardent defender of the rights of the underprivileged, Rabbi Herzog was all of these.',
        ],
        dissertationTitle: 'The Dissertation',
        dissertation: [
            'Rabbi Isaac Halevi Herzog (1888–1959), the first Chief Rabbi of the State of Israel, wrote his doctoral dissertation in 1914 on the topic of "Hebrew Porphyrology", a term he coined for the study of Biblical Tekhelet. His groundbreaking research laid the foundation for all subsequent work in the field. Ptil Tekhelet is proud to present for the first time, the full text of Rabbi Herzog\'s doctorate, along with selected correspondence on the topic.',
            'But throughout his life, since his days as a student in London, one subject held a very dear place in his heart and mind, the theme of his doctorate. Hebrew Porphyrology — the study of the ancient biblical dye Tekhelet — remained his enduring passion. Rabbi Herzog\'s doctoral dissertation displays a mastery of such diverse subjects as archaeology, Greek and Roman literature, chemistry, Talmudic and Midrashic texts, and philology, and it includes references to Semitic languages, Sanskrit, and Chinese. According to his son President Chaim Herzog, his father had a good knowledge of some twelve languages.',
            'The bulk of his dissertation relates to assessing the possibility that the long sought hillazon was indeed a sea snail. One fascinating portion of his dissertation relates to the work of Gershon Henokh Leiner, the Radzyner rebbe who had identified the enigmatic hillazon as the cuttlefish Sepia officinalis.',
        ],
    },
    heb: {
        aboutTitle: 'הרב יצחק הלוי הרצוג',
        about: [
            'הרב יצחק הלוי הרצוג נולד בפולין בשנת 1888, ועלה עם משפחתו לאנגליה בגיל תשע. אביו כיהן כרב בלידס ולקח על עצמו את חינוכו הדתי האינטנסיבי של בנו, במקום לשלוח אותו לבית ספר. בטרם מלאו לו עשרים שנה, קיבל סמיכה רבנית מאת שלושה מגדולי תלמידי החכמים, ובהם רב סלונים.',
            'לימודיו של הרב הרצוג לא הסתיימו עם שליטתו בספרות התלמודית. הוא למד בסורבון בפריז וקיבל תואר בשפות המזרח. לאחר מכן קיבל תארים בקלאסיקה ובמתמטיקה מאוניברסיטת לונדון, שם ביולי 1914, בהיותו בן עשרים וחמש, קיבל גם את התואר דוקטור לספרות. בחקירה שכינה ״פורפירולוגיה״, כתב את עבודתו על נושא התכלת.',
            'בשנת 1916 נטל הרב הרצוג את כס הרבנות בבלפסט, ובסופו של דבר מונה לרב הראשי של אירלנד — תפקיד שמילא עד שנת 1937. כשנפטר הרב אברהם יצחק הכהן קוק, הרב הראשי המכובד של ארץ ישראל המנדטורית, בשנת 1935, נבחר הרב הרצוג לרשת את מקומו, וכיהן בתפקיד מ-1937 עד 1948, אז חילקה האו״ם את המנדט הבריטי והקים את מדינת ישראל. לאחר מכן שימש כרב הראשי של מדינת ישראל עד פטירתו בשנת 1959. איש מדינה, חכם תורה ולוחם נלהב למען זכויות החלשים — הרב הרצוג היה כל אלה.',
        ],
        dissertationTitle: 'עבודת הדוקטורט',
        dissertation: [
            'הרב יצחק הלוי הרצוג (1888–1959), הרב הראשי הראשון של מדינת ישראל, כתב את עבודת הדוקטורט שלו בשנת 1914 בנושא ״פורפירולוגיה עברית״ — מונח שטבע לציון חקר התכלת המקראי. מחקרו פורץ הדרך הניח את היסודות לכל העבודה שנעשתה בתחום לאחריו. פתיל תכלת גאה להציג לראשונה את הטקסט המלא של הדוקטורט של הרב הרצוג, יחד עם מכתבים נבחרים בנושא.',
            'אך לאורך כל חייו, מימי לימודיו בלונדון, נושא אחד מילא מקום מיוחד בלבו ובמחשבתו — נושא עבודת הדוקטורט שלו. הפורפירולוגיה העברית — חקר הצבע הכחול המקראי העתיק, התכלת — נותרה תשוקתו המתמדת. עבודתו מגלה שליטה בתחומים מגוונים כגון ארכאולוגיה, ספרות יוונית ורומית, כימיה, טקסטים תלמודיים ומדרשיים ופילולוגיה, והיא כוללת התייחסויות לשפות שמיות, סנסקריט וסינית. על פי בנו, הנשיא חיים הרצוג, לאביו הייתה שליטה טובה בכשתים עשרה שפות.',
            'עיקר עבודתו עוסק בהערכת האפשרות שהחלזון הנכסף היה אכן חלזון ים. חלק מרתק בעבודתו מוקדש לעבודתו של ר׳ גרשון חנוך ליינר, האדמו״ר מראדזין, שזיהה את החלזון האניגמטי כדיונון ממין Sepia officinalis.',
        ],
    },
}

export default function HomePage() {
    const lang = useSelector((s) => s.ui.lang)
    const isHeb = lang === 'heb'
    const c = isHeb ? content.heb : content.en
    return (
        <div className="home-page">
            <section className="hero">
                <h1>{isHeb ? 'פורפירולוגיה עברית' : 'Hebrew Porphyrology'}</h1>
                <p>
                    {isHeb
                        ? 'עבודת הדוקטורט של הרב יצחק הרצוג על זהות מקורות התכלת — הצבע הכחול הקדום של התורה.'
                        : <>The doctoral dissertation of Rabbi Isaac Herzog on the identity and sources of <em>Tekhelet</em> — the ancient blue dye of the Torah.</>}
                </p>
                <Link to="/view" className="hero-cta">
                    {isHeb ? '← קרא את העבודה' : 'Read the Dissertation →'}
                </Link>
            </section>

            <div className="home-portrait">
                <img
                    src="https://res.cloudinary.com/dqidhqkor/image/upload/v1709645199/HerzogStudyingCrop_tdd3py.jpg"
                    alt="Rabbi Isaac Herzog studying"
                />
            </div>

            <section className="content-section">
                <h2>{c.aboutTitle}</h2>
                {c.about.map((para, i) => <p key={i}>{para}</p>)}
            </section>

            <section className="content-section content-section--alt">
                <h2>{c.dissertationTitle}</h2>
                {c.dissertation.map((para, i) => <p key={i}>{para}</p>)}
                <Link to="/view" className="cta-btn">
                    {isHeb ? '← קרא את העבודה' : 'Read the Dissertation →'}
                </Link>
            </section>

            <div className="home-doctorate-img">
                <img
                    src="https://res.cloudinary.com/dqidhqkor/image/upload/v1709645520/HerzogDoctorate_s8cid8.png"
                    alt="Cover of Rabbi Herzog's doctoral dissertation"
                />
            </div>
        </div>
    )
}

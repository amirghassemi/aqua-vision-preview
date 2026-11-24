'use client';

import { useRef, useState, type FormEvent, type KeyboardEvent } from 'react';
import { Menu, X, Phone, Waves, Check, Trophy, ShieldCheck, Target, Medal, BookOpen, Plus, Minus, LoaderCircle, CheckCircle2, Expand, Users, Activity } from 'lucide-react';
import { programs, gallery, articles, faqs, type ProgramId } from './content';

const PHONE = '+989197840959';
const navigation = [['دوره‌های شنا', '#programs'], ['مسیر مسابقات', '#competition'], ['درباره آکادمی', '#team'], ['آموزش و راهنما', '#learn']];
const normalizePhone = (value: string) => value.replace(/[۰-۹]/g, c => String(c.charCodeAt(0) - 1776)).replace(/[٠-٩]/g, c => String(c.charCodeAt(0) - 1632)).replace(/[\s()-]/g, '').replace(/^(\+98|0098|98)/, '0');

export default function Academy() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeProgram, setActiveProgram] = useState<ProgramId>('kids');
  const [formProgram, setFormProgram] = useState('consultation');
  const [galleryFilter, setGalleryFilter] = useState('all');
  const [galleryItem, setGalleryItem] = useState<number | null>(null);
  const [article, setArticle] = useState<number | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const [reference, setReference] = useState('');
  const [requiresSignIn, setRequiresSignIn] = useState(false);
  const galleryDialog = useRef<HTMLDialogElement>(null);
  const articleDialog = useRef<HTMLDialogElement>(null);
  const program = programs[activeProgram];

  function selectProgram(id: ProgramId) {
    setActiveProgram(id);
  }
  function tabKey(event: KeyboardEvent<HTMLButtonElement>, id: ProgramId) {
    const ids = Object.keys(programs) as ProgramId[];
    const position = ids.indexOf(id);
    let next = position;
    if (event.key === 'ArrowLeft') next = (position + 1) % ids.length;
    else if (event.key === 'ArrowRight') next = (position + ids.length - 1) % ids.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = ids.length - 1;
    else return;
    event.preventDefault();
    setActiveProgram(ids[next]);
    document.getElementById('tab-' + ids[next])?.focus();
  }
  function openPhoto(index: number) { setGalleryItem(index); galleryDialog.current?.showModal(); }
  function openArticle(index: number) { setArticle(index); articleDialog.current?.showModal(); }
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending) return;
    setError(''); setRequiresSignIn(false);
    const form = new FormData(event.currentTarget);
    const phone = normalizePhone(String(form.get('phone') || ''));
    if (!/^09\d{9}$/.test(phone)) { setError('شماره همراه را کامل وارد کنید؛ مانند ۰۹۱۲۳۴۵۶۷۸۹.'); document.getElementById('phone')?.focus(); return; }
    if (String(form.get('name') || '').trim().length < 3) { setError('نام و نام خانوادگی را کامل وارد کنید.'); document.getElementById('full-name')?.focus(); return; }
    setReference('PREVIEW');
  }

  return <>
    <div className="preview-banner"><strong>پیش‌نمایش طراحی سایت آکوا ویژن</strong><span>این نسخه برای بررسی ظاهر و امکانات است؛ ثبت‌نام واقعی و ارسال اطلاعات در آن فعال نیست.</span></div>
    <a className="skip-link" href="#main">رفتن به محتوای اصلی</a>
    <div className="topbar"><div className="container topbar-inner"><span>آموزش شنا برای هر سن، تمرین برای هر هدف</span><a href={'tel:' + PHONE} dir="ltr"><Phone size={14} /> +98 919 784 0959</a></div></div>
    <header className="site-header">
      <div className="container nav-inner">
        <a className="brand" href="#home" aria-label="آکوا ویژن، صفحه اصلی"><img src="./images/logo.jpg" alt="لوگوی آکوا ویژن" width="64" height="64" /><span><strong>آکوا ویژن</strong><small lang="en" dir="ltr">AQUA VISION</small></span></a>
        <nav className="desktop-nav" aria-label="منوی اصلی">{navigation.map(([label, href]) => <a key={href} href={href}>{label}</a>)}</nav>
        <a className="button button-dark header-cta" href="#contact">مشاوره و پیش‌ثبت‌نام</a>
        <button className="menu-toggle" aria-label={menuOpen ? 'بستن منو' : 'باز کردن منو'} aria-expanded={menuOpen} aria-controls="mobile-menu" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
      </div>
      {menuOpen && <nav id="mobile-menu" className="mobile-nav" aria-label="منوی موبایل">{navigation.map(([label, href]) => <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}<a href="#contact" onClick={() => setMenuOpen(false)}>تماس و پیش‌ثبت‌نام</a></nav>}
    </header>

    <main id="main">
      <section id="home" className="hero">
        <div className="hero-copy">
          <div className="eyebrow light"><span className="short-line" />آکادمی شنای آکوا ویژن</div>
          <h1>از اولین حرکت،<br /><em>تا خط پایان.</em></h1>
          <p>آموزش کودکان، همراهی بزرگسالان از مبتدی تا حرفه‌ای و تمرین هدفمند برای مسابقات استانی و کشوری.</p>
          <div className="hero-actions"><a className="button button-cyan" href="#programs">مسیر خودت را پیدا کن</a><a className="button button-outline-light" href="#contact">پیش‌ثبت‌نام</a></div>
          <div className="hero-supervisor"><img src="./images/coach.png" alt="" width="46" height="46" /><span>زیر نظر آقای <strong>عارف چگینی</strong><small>مدیریت آکادمی آکوا ویژن</small></span></div>
          <span className="hero-watermark" aria-hidden="true">AQUA</span>
        </div>
        <div className="hero-photo"><img src="./images/team.jpg" alt="تیم شنای آکوا ویژن با لباس‌های آبی و مشکی کنار استخر" fetchPriority="high" width="2560" height="1706" /><div className="photo-caption"><span lang="en" dir="ltr">ONE TEAM. ONE VISION.</span><strong>با هم، فراتر از امروز.</strong></div></div>
      </section>

      <div className="path-strip"><div className="container path-strip-inner"><span className="path-intro"><Waves size={26} /><strong>هر هدف، یک مسیر.</strong></span><a href="#programs" onClick={() => selectProgram('kids')}><Users size={22} /> کودکان و نوجوانان</a><a href="#programs" onClick={() => selectProgram('adults')}><Activity size={22} /> بزرگسالان، مبتدی تا حرفه‌ای</a><a href="#competition" onClick={() => selectProgram('competition')}><Trophy size={22} /> آمادگی مسابقات</a></div></div>

      <section id="programs" className="section container">
        <div className="section-heading"><div><div className="eyebrow">دوره‌های آکوا ویژن</div><h2>از جایی که هستی، شروع کن.</h2></div><p>سن، تجربه و هدف شما متفاوت است.<br />مسیر یادگیری‌تان هم باید متناسب با شما باشد.</p></div>
        <div className="program-tabs" role="tablist" aria-label="انتخاب گروه آموزشی">{(Object.keys(programs) as ProgramId[]).map(id => <button key={id} id={'tab-' + id} role="tab" aria-selected={activeProgram === id} aria-controls="program-panel" tabIndex={activeProgram === id ? 0 : -1} className={activeProgram === id ? 'active' : ''} onKeyDown={e => tabKey(e, id)} onClick={() => selectProgram(id)}>{programs[id].label}</button>)}</div>
        <div className="program-panel" id="program-panel" role="tabpanel" aria-labelledby={'tab-' + activeProgram}>
          <div className={'program-image ' + activeProgram}><img src={'./images/' + program.image} alt={program.alt} loading="lazy" /><span>{program.tag}</span></div>
          <div className="program-content"><h3>{program.title}</h3><p>{program.description}</p><ul className="feature-list">{program.features.map(feature => <li key={feature}><Check size={18} />{feature}</li>)}</ul><div className="level-path">{program.levels.map(level => <span key={level}>{level}</span>)}</div><p className="program-note">{program.note}</p><a href="#contact" className="button button-dark" onClick={() => setFormProgram(activeProgram)}>درخواست مشاوره این دوره</a></div>
        </div>
      </section>

      <section className="journey-section"><div className="container journey-layout"><div><div className="eyebrow">پیشرفت با مسیر روشن</div><h2>هدف بزرگ،<br />قدم‌های درست.</h2><p>از انتخاب دوره تا آماده‌شدن برای هدف بعدی، مسیر را با شناخت توانایی‌هایتان پیش می‌بریم.</p></div><div className="journey-steps">{[
        [ShieldCheck, 'آشنایی و تعیین سطح', 'گفت‌وگو درباره هدف و ارزیابی مهارت‌های فعلی در آب.'],
        [Waves, 'یادگیری اصولی', 'تمرکز بر تنفس، وضعیت بدن و تکنیک متناسب با سطح.'],
        [Target, 'تمرین و ارزیابی', 'تمرین هدفمند و بازخورد مربی برای شناخت پیشرفت.'],
        [Trophy, 'قدم بعدی شما', 'ورود به سطح بالاتر یا مسیر آمادگی مسابقات.'],
      ].map(([Icon, title, description]) => { const StepIcon = Icon as typeof ShieldCheck; return <div className="journey-step" key={title as string}><span className="step-icon"><StepIcon size={23} /></span><div><h3>{title as string}</h3><p>{description as string}</p></div></div>; })}</div></div></section>

      <section id="competition" className="competition-section">
        <div className="container competition-layout"><div className="competition-copy"><div className="eyebrow light">از مهارت تا رقابت</div><h2>تمرین برای<br /><em>لحظه‌ای که مهم است.</em></h2><p>آمادگی مسابقات استانی و کشوری با شناخت رکورد فعلی، اصلاح جزئیات تکنیک و برنامه‌ریزی تمرین آغاز می‌شود.</p><div className="competition-pillars"><div><Target /><h3>تکنیک مسابقه</h3><p>چهار شنا، استارت، برگشت و پایان</p></div><div><Activity /><h3>سرعت و استقامت</h3><p>تمرین متناسب با ماده و هدف شناگر</p></div><div><Medal /><h3>آمادگی حضور</h3><p>ارزیابی عملکرد و شرایط ورود به رقابت</p></div></div><a className="button button-cyan" href="#contact" onClick={() => setFormProgram('competition')}>درخواست ارزیابی برای مسابقات</a><p className="fine-print">پذیرش در گروه مسابقات براساس ارزیابی مربی است؛ حضور در هر رویداد به ضوابط برگزارکننده بستگی دارد.</p></div><div className="competition-photo"><img src="./images/podium.jpg" alt="اهدای مدال به شناگر تیم آکوا ویژن روی سکوی مسابقه" loading="lazy" /><div className="competition-photo-label"><Trophy size={24} /><span>لحظه‌های واقعی<br /><strong>تیم آکوا ویژن</strong></span></div></div></div>
      </section>

      <section id="team" className="section container coach-layout"><div className="coach-image"><img src="./images/coach.png" alt="عارف چگینی، مدیر آکادمی شنای آکوا ویژن" width="640" height="640" loading="lazy" /><span lang="en" dir="ltr">AQUA VISION ACADEMY</span></div><div className="coach-copy"><div className="eyebrow">آشنایی با آکادمی</div><h2>یک مسیر مشترک.<br /><span>یک نگاه رو به جلو.</span></h2><p>آکوا ویژن، فضایی برای شروع یادگیری، بهتر شناکردن و دنبال‌کردن هدف‌های رقابتی است؛ برای کودکی که تازه با آب آشنا می‌شود و بزرگسالی که هدف تازه‌ای در شنا دارد.</p><div className="coach-signature"><h3>عارف چگینی</h3><span>مدیریت و نظارت بر آکادمی شنای آکوا ویژن</span></div><div className="coach-values"><span><Check size={18} /> توجه به سطح و هدف شناگر</span><span><Check size={18} /> مسیر آموزشی مرحله‌به‌مرحله</span><span><Check size={18} /> همراهی از آموزش تا رقابت</span></div><a className="text-link" href={'tel:' + PHONE}><Phone size={18} /> گفت‌وگو با آکادمی</a></div></section>

      <section id="moments" className="gallery-section"><div className="container"><div className="section-heading"><div><div className="eyebrow">از قاب آکوا ویژن</div><h2>قصه ما، در کنار هم.</h2></div><p>لحظه‌هایی از تیم، یادگیری و مسابقه.</p></div><div className="gallery-filters" role="group" aria-label="فیلتر گالری">{[['all','همه عکس‌ها'],['team','تیم و هنرجویان'],['achievements','مسابقه و تقدیر'],['education','آموزش']].map(([value,label]) => <button key={value} aria-pressed={galleryFilter === value} className={galleryFilter === value ? 'active' : ''} onClick={() => setGalleryFilter(value)}>{label}</button>)}</div><div className="gallery-grid">{gallery.map((item,index) => (galleryFilter === 'all' || galleryFilter === item.category) && <button className={'gallery-card gallery-' + index} onClick={() => openPhoto(index)} key={item.src} aria-label={'نمایش عکس: ' + item.caption}><img src={'./images/' + item.src} alt={item.caption} loading="lazy" /><span className="gallery-overlay"><span><small>{item.label}</small><strong>{item.caption}</strong></span><Expand size={20} /></span></button>)}</div></div></section>

      <section id="learn" className="section container"><div className="section-heading"><div><div className="eyebrow">آموزش و راهنما</div><h2>شنا را آگاهانه‌تر دنبال کن.</h2></div><p>راهنماهایی برای شروع بهتر<br />و شناخت قدم بعدی.</p></div><div className="articles-grid">{articles.map((item,index) => <article key={item.title} className="article-card"><button onClick={() => openArticle(index)} className="article-image" aria-label={'خواندن: ' + item.title}><img src={'./images/' + item.image} alt="" loading="lazy" /><span>{item.tag}</span></button><div className="article-body"><span className="article-time"><BookOpen size={15} />{item.time}</span><h3><button onClick={() => openArticle(index)}>{item.title}</button></h3><button className="text-link" onClick={() => openArticle(index)}>خواندن راهنما <Plus size={17} /></button></div></article>)}</div></section>

      <section className="faq-section"><div className="container faq-layout"><div><div className="eyebrow">پیش از شروع</div><h2>شاید سؤال<br />شما هم باشد.</h2><p>برای راهنمایی متناسب با شرایط خودتان، با ما در تماس باشید.</p><a className="text-link" href={'tel:' + PHONE}><Phone size={18} /><bdi>۰۹۱۹ ۷۸۴ ۰۹۵۹</bdi></a></div><div className="faq-list">{faqs.map(([question,answer],index) => <div key={question} className={'faq-item ' + (openFaq === index ? 'open' : '')}><h3><button aria-expanded={openFaq === index} aria-controls={'faq-' + index} onClick={() => setOpenFaq(openFaq === index ? null : index)}>{question}{openFaq === index ? <Minus size={19} /> : <Plus size={19} />}</button></h3><div id={'faq-' + index} hidden={openFaq !== index}><p>{answer}</p></div></div>)}</div></div></section>

      <section id="contact" className="section container contact-layout"><div className="contact-copy"><div className="eyebrow">پیش‌نمایش تماس با ما و پیش‌ثبت‌نام</div><h2>قدم اول،<br /><span>یک گفت‌وگوست.</span></h2><p>از تجربه و هدفتان بگویید تا مسیر مناسب برای شروع یا ادامه شنا را با هم پیدا کنیم.</p><a className="contact-phone" href={'tel:' + PHONE}><span className="contact-phone-icon"><Phone size={24} /></span><span><small>تماس با آکوا ویژن</small><strong dir="ltr">+98 919 784 0959</strong></span></a><div className="contact-note"><ShieldCheck size={23} /><p>پیش‌ثبت‌نام برای هماهنگی اولیه است. زمان، محل برگزاری و شهریه پس از مشخص‌شدن دوره و سطح هماهنگ می‌شود.</p></div><div className="contact-brand"><img src="./images/logo.jpg" alt="" width="75" height="75" /><span lang="en" dir="ltr">YOUR NEXT CHAPTER<br /><strong>STARTS IN THE WATER.</strong></span></div></div>
        <div className="contact-form-wrap">{reference ? <div className="success-panel" role="status"><CheckCircle2 size={54} /><h3>فرم آزمایشی بررسی شد.</h3><p>هیچ اطلاعاتی ذخیره یا برای آکادمی ارسال نشده است.</p><p>این بخش فقط نمایش عملکرد فرم در پیش‌نمایش طراحی است.</p><a className="button button-dark" href={'tel:' + PHONE}>تماس با آکادمی</a><button className="text-link" onClick={() => { setReference('');  }}>بازگشت به فرم آزمایشی</button></div> : <form onSubmit={submit} aria-busy={sending}><div className="form-heading"><h3>پیش‌نمایش فرم پیش‌ثبت‌نام</h3><p>برای امتحان فرم از اطلاعات ساختگی استفاده کنید. هیچ داده‌ای ارسال یا ذخیره نمی‌شود.</p></div><div className="form-grid"><div className="field"><label htmlFor="full-name">نام و نام خانوادگی <span>*</span></label><input id="full-name" name="name" autoComplete="name" required minLength={3} maxLength={80} placeholder="نام هنرجو یا والد / سرپرست" /></div><div className="field"><label htmlFor="phone">شماره همراه <span>*</span></label><input id="phone" name="phone" type="tel" inputMode="tel" dir="ltr" autoComplete="tel" required maxLength={22} placeholder="0912 345 6789" /></div><div className="field"><label htmlFor="age-group">گروه سنی هنرجو <span>*</span></label><select id="age-group" name="ageGroup" required defaultValue=""><option value="" disabled>انتخاب گروه سنی</option><option value="child">کودک، زیر ۱۲ سال</option><option value="teen">نوجوان، ۱۲ تا ۱۷ سال</option><option value="adult">بزرگسال، ۱۸ سال و بیشتر</option></select></div><div className="field"><label htmlFor="program">دوره مورد علاقه <span>*</span></label><select id="program" name="program" required value={formProgram} onChange={e => setFormProgram(e.target.value)}><option value="consultation">برای انتخاب دوره مشاوره می‌خواهم</option><option value="kids">آموزش کودکان و نوجوانان</option><option value="adults">آموزش بزرگسالان</option><option value="competition">آمادگی مسابقات استانی و کشوری</option></select></div><div className="field full"><label htmlFor="level">سطح فعلی شنا <span>*</span></label><select id="level" name="level" required defaultValue="unsure"><option value="unsure">نیاز به تعیین سطح دارم</option><option value="beginner">مبتدی؛ شروع از پایه</option><option value="intermediate">متوسط؛ تکمیل مهارت</option><option value="advanced">پیشرفته؛ اصلاح تکنیک و تمرین حرفه‌ای</option><option value="competitive">شناگر مسابقه‌ای</option></select></div><div className="field full"><label htmlFor="message">هدف یا توضیح شما <small>اختیاری</small></label><textarea id="message" name="message" rows={3} maxLength={1200} placeholder="مثلاً شروع شنا، اصلاح تکنیک یا آمادگی برای مسابقه…" /></div></div><div className="honeypot" aria-hidden="true"><label htmlFor="website">وب‌سایت</label><input id="website" name="website" autoComplete="off" tabIndex={-1} /></div><label className="consent"><input type="checkbox" name="consent" required /><span>می‌دانم این فرم آزمایشی است و باعث ثبت‌نام یا ارسال اطلاعات نمی‌شود.</span></label>{error && <div className="form-error" role="alert"><p>{error}</p>{requiresSignIn && <a href="/signin-with-chatgpt?return_to=/%23contact" target="_top">ورود برای ثبت درخواست</a>}</div>}<button className="button button-dark submit-button" type="submit" disabled={sending}>{sending ? <><LoaderCircle className="spinner" size={20} />در حال ثبت…</> : 'بررسی فرم آزمایشی'}</button><p className="form-privacy">اطلاعات این فرم فقط تا زمان بازبودن صفحه در حافظه مرورگر باقی می‌ماند.</p></form>}</div>
      </section>
    </main>

    <footer className="site-footer"><div className="container footer-main"><div><a className="brand footer-brand" href="#home"><img src="./images/logo.jpg" alt="لوگوی آکوا ویژن" width="68" height="68" /><span><strong>آکوا ویژن</strong><small lang="en" dir="ltr">AQUA VISION</small></span></a><p>از اولین حرکت، تا خط پایان.<br />زیر نظر آقای عارف چگینی</p></div><div className="footer-links"><strong>مسیرهای آموزش</strong><a href="#programs" onClick={() => selectProgram('kids')}>کودکان و نوجوانان</a><a href="#programs" onClick={() => selectProgram('adults')}>بزرگسالان</a><a href="#competition">آمادگی مسابقات</a></div><div className="footer-links"><strong>همراه آکوا ویژن</strong><a href="#team">درباره آکادمی</a><a href="#moments">گالری تیم</a><a href="#learn">آموزش و راهنما</a></div><div className="footer-contact"><strong>شروع یک مسیر تازه</strong><a href={'tel:' + PHONE} dir="ltr">+98 919 784 0959</a><a className="button button-outline-light" href="#contact">مشاوره و پیش‌ثبت‌نام</a></div></div><div className="container footer-bottom"><span>© آکادمی شنای آکوا ویژن. همه حقوق محفوظ است.</span><span lang="en" dir="ltr">LEARN. PROGRESS. COMPETE.</span></div></footer>

    <dialog ref={galleryDialog} className="photo-dialog" onClick={e => { if (e.target === e.currentTarget) galleryDialog.current?.close(); }}><button className="dialog-close" onClick={() => galleryDialog.current?.close()} aria-label="بستن تصویر"><X /></button>{galleryItem !== null && <figure><img src={'./images/' + gallery[galleryItem].src} alt={gallery[galleryItem].caption} /><figcaption>{gallery[galleryItem].caption}</figcaption></figure>}</dialog>
    <dialog ref={articleDialog} className="article-dialog" onClick={e => { if (e.target === e.currentTarget) articleDialog.current?.close(); }}><button className="dialog-close" onClick={() => articleDialog.current?.close()} aria-label="بستن راهنما"><X /></button>{article !== null && <article><div className="eyebrow">{articles[article].tag}</div><h2>{articles[article].title}</h2><p className="article-intro">{articles[article].intro}</p>{articles[article].sections.map(([heading,body]) => <section key={heading}><h3>{heading}</h3><p>{body}</p></section>)}<div className="article-bottom"><span>راهنمای عمومی آکوا ویژن؛ انتخاب سطح با ارزیابی مربی انجام می‌شود.</span><a className="button button-dark" href="#contact" onClick={() => articleDialog.current?.close()}>درخواست تعیین سطح</a></div></article>}</dialog>
  </>;
}



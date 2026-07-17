import { useState } from 'react'
import { useSelector } from 'react-redux'

export default function OrgPdfPanel({ orgPdfs }) {
    const [open, setOpen] = useState(false)
    const [activeIdx, setActiveIdx] = useState(0)
    const [lightbox, setLightbox] = useState(false)
    const lang = useSelector((s) => s.ui.lang)
    const isHeb = lang === 'heb'

    const t = {
        show: isHeb ? '📄 צפה במקור' : '📄 View original',
        hide: isHeb ? '✕ הסתר מקור' : '✕ Hide original',
        label: isHeb ? 'מסמך מקורי' : 'Original manuscript',
        enlarge: isHeb ? 'לחץ להגדלה' : 'Click to enlarge',
        prev: isHeb ? 'עמוד קודם ←' : '← Prev page',
        next: isHeb ? '→ עמוד הבא' : 'Next page →',
    }

    if (!orgPdfs || orgPdfs.length === 0) return null

    return (
        <>
            <button
                className="org-pdf-toggle"
                onClick={() => setOpen((v) => !v)}
                title={t.label}
            >
                {open ? t.hide : t.show}
            </button>

            {open && (
                <div className="org-pdf-panel">
                    <div className="org-pdf-header">
                        <span>{t.label}</span>
                        {orgPdfs.length > 1 && (
                            <div className="org-pdf-pager">
                                {orgPdfs.map((_, i) => (
                                    <button
                                        key={i}
                                        className={`pager-dot ${i === activeIdx ? 'active' : ''}`}
                                        onClick={() => setActiveIdx(i)}
                                    >
                                        {i + 1}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="org-pdf-img-wrap" onClick={() => setLightbox(true)}>
                        <img
                            src={orgPdfs[activeIdx]}
                            alt={`${t.label} ${activeIdx + 1}`}
                            loading="lazy"
                        />
                        <span className="org-pdf-zoom-hint">{t.enlarge}</span>
                    </div>

                    {orgPdfs.length > 1 && (
                        <div className="org-pdf-nav">
                            <button
                                onClick={() => setActiveIdx((i) => Math.max(0, i - 1))}
                                disabled={activeIdx === 0}
                            >
                                {t.prev}
                            </button>
                            <span>{activeIdx + 1} / {orgPdfs.length}</span>
                            <button
                                onClick={() => setActiveIdx((i) => Math.min(orgPdfs.length - 1, i + 1))}
                                disabled={activeIdx === orgPdfs.length - 1}
                            >
                                {t.next}
                            </button>
                        </div>
                    )}
                </div>
            )}

            {lightbox && (
                <div className="lightbox" onClick={() => setLightbox(false)}>
                    <div className="lightbox-inner">
                        <img src={orgPdfs[activeIdx]} alt="Original manuscript" />
                    </div>
                </div>
            )}
        </>
    )
}

import { useState } from 'react'

export default function ImgBlock({ block }) {
    const [lightbox, setLightbox] = useState(false)

    return (
        <>
            <figure className="block block--img" onClick={() => setLightbox(true)}>
                <img src={block.url} alt="Dissertation illustration" loading="lazy" />
                <figcaption>Click to enlarge</figcaption>
            </figure>

            {lightbox && (
                <div className="lightbox" onClick={() => setLightbox(false)}>
                    <div className="lightbox-inner">
                        <img src={block.url} alt="Enlarged illustration" />
                    </div>
                </div>
            )}
        </>
    )
}

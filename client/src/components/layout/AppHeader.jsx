import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setLang } from '../../store/slices/uiSlice'

export default function AppHeader() {
    const dispatch = useDispatch()
    const lang = useSelector((state) => state.ui.lang)

    const isHeb = lang === 'heb'

    return (
        <header className="app-header">
            <div className="header-logo">
                <span>{isHeb ? 'פורפירולוגיה עברית' : 'Hebrew Porphyrology'}</span>
            </div>

            <nav>
                <NavLink to="/">{isHeb ? 'בית' : 'Home'}</NavLink>
                <NavLink to="/view">{isHeb ? 'קריאה' : 'Read'}</NavLink>
                <NavLink to="/search">{isHeb ? 'חיפוש' : 'Search'}</NavLink>
            </nav>

            <div className="lang-toggle">
                <button
                    className={lang === 'en' ? 'active' : ''}
                    onClick={() => dispatch(setLang('en'))}
                >
                    EN
                </button>
                <span style={{ color: 'rgba(255,255,255,0.4)' }}>|</span>
                <button
                    className={lang === 'heb' ? 'active' : ''}
                    onClick={() => dispatch(setLang('heb'))}
                >
                    עב
                </button>
            </div>
        </header>
    )
}

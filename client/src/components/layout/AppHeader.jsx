import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setLang } from '../../store/slices/uiSlice'
import { BookOpen, Home, Search } from 'lucide-react'
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
                <NavLink className="desktop-link" to="/">{isHeb ? 'בית' : 'Home'}</NavLink>
                <NavLink className="mobile-link" to="/">
                    <Home size={18} />
                </NavLink>
                <NavLink className="desktop-link" to="/view">{isHeb ? 'קריאה' : 'Read'}</NavLink>
                <NavLink className="mobile-link" to="/view">
                    <BookOpen size={18} />
                </NavLink>
                <NavLink className="desktop-link" to="/search">{isHeb ? 'חיפוש' : 'Search'}</NavLink>
                <NavLink className="mobile-link" to="/search">
                    <Search size={18} />
                </NavLink>
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

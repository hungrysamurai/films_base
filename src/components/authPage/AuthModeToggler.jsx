const AuthModeToggler = ({activeMode, setActiveMode}) => {
 return (
  <div className="auth-mode-container">
      <div 
      className={`sign-in ${activeMode === 'sign-in' ? 'active': ''}`}
      onClick={() => setActiveMode('sign-in')}>
        <h3>Вход</h3>
      </div>
      <div className="divider"><h3>|</h3></div>
      <div 
      className={`sign-up ${activeMode === 'sign-up' ? 'active': ''}`}
      onClick={() => setActiveMode('sign-up')}>
        <h3>
          Регистрация
        </h3>
      </div>
     </div>
 )
}

export default AuthModeToggler;
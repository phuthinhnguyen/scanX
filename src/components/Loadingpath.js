// preloader when user change path
function Loadingpath() {
    return (
        <div className="preloader-wrap">
            <div className="header">
                <img src="../img/logo.png" style={{width:"40px",height:"40px", marginRight:"10px"}}></img>
                <h2 className="logotext">ScanApp</h2>
            </div>
            <div className="preloader">
                <img src="/img/Preloader_7.gif" alt=""></img>
            </div>
        </div>

    )
}
export default Loadingpath;
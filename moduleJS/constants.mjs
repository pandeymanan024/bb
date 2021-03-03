export class Constants{
    constructor(){
        this.DatabaseId;
    }
    static CustomerUrl = "https://bbecom-998a.restdb.io/rest/customer";
    static UserUrl = "https://users-de8f.restdb.io/rest/system_jobs";
    static MediaUrl = "https://bbecom-998a.restdb.io/media";
    static CustomerApiKey = "602276113f9eb665a1689352";
    static UserApiKey = "603b382710f29b640ed97bc5";
    static PostMethod = "POST";
    static GetMethod = "GET";
    static PutMethod = "PUT";
    static DeleteMethod = "DELETE";
    static ContentType = "Content-type";
    static DataType = "application/json";
    static ApiKey = "x-apikey";
    static AddMsg="Data Added Successfully";
    static DupMsg = "Data Already Exists";
    static RegisterHtmlElement = document.getElementById("message");
    static LoginHtmlElement = document.getElementById("login-message");
    static OtpHtmlElement = document.getElementById("otp");
    static FormId = document.getElementById("form-id");
    static ForgotPasswordMsg = document.getElementById("error-message");
    static OTPError = document.getElementById("otp-verify");
    static ResetError = document.getElementById("reset-error");
    static cartmap = new Map();
    static itemlist = "";
}
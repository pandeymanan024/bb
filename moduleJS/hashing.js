// We have implemented our own hashing technique as of now but we will update in future with MD-5 or some other
// const bcrypt = require('bcrypt-nodejs');
// import bcrypt from 'bcrypt-nodejs';
export class Hashing {
  constructor() {}

encrypt(encryptData) {

    var ans = "";
    var n = encryptData.length;
    for (let x = 0; x < n; x++) {
      let binaryData = encryptData.charCodeAt(x).toString(2);
      let temp = encryptData.charCodeAt(x).toString(2)[0];
      var new_result = "";
      for (let i = 1; i < binaryData.length; i++) {
        new_result += binaryData[i];
      }
      new_result += temp;
      var result = 0;
      console.log(new_result);
      for(let i=0; i<new_result.length; i++){
          result+=(parseInt(new_result[i]))*(2**(new_result.length-(i+1)));
      }
      let finalAscii = String.fromCharCode(result);
      ans += finalAscii;
    }
    ans = ans.slice(0,ans.length-1);
    console.log(ans);
    return ans;

    // encryptData = encryptData*7 + 7;
    // return encryptData;
  }

  decrypt(decryptData) {
    var ans = "";
    var n = decryptData.length;
    var a = decryptData.split("-");
    console.log(a,a.length);
    for (let x = 0; x < a.length; x++) {
      let binaryData = parseInt(a[x]).toString(2);
      let temp = parseInt(a[x]).toString(2).slice(-1)[0];

      var new_result = "";
      for (let i = 0; i < binaryData.length-1; i++) {
        new_result += binaryData[i];
      }
      new_result = temp + new_result;
      var result = 0;
      console.log(new_result,decryptData,binaryData,temp);
      for(let i=0; i<new_result.length; i++){
        result+=(parseInt(new_result[i]))*(2**(new_result.length-(i+1)));
      }
      let finalAscii = String.fromCharCode(result);
      ans += finalAscii;
    }
    console.log(ans);
        return decryptData;
  }
}
// export {Hashing};
// exports =  Hashing;
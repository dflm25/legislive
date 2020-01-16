/**
 * 
 */

export const timeText = () => {
    var data = [
        [0, 12, "Good morning"],
        [12, 18, "Good afternoon"],
        [18, 24, "Good night"]
    ],
        hr = new Date().getHours();
    
    for(var i=0; i<data.length;i++){
        if(hr >= data[i][0] && hr <= data[i][1]){
            return data[i][2];
            break;
        }
    }
}


export const validateEmail = (email) => {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

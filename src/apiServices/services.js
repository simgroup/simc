const siteUrl = "http://ec2-35-176-66-190.eu-west-2.compute.amazonaws.com:1517/admin"; //Staging 

export default function apiService(variables, method, apiMethod, token, id) {
    var init = apiMethod == "GET" ? {
        method: "GET",
        headers: {
            'Content-Type': "application/json",
            'token': token ? token : ''
        }
    } :
        {
            method: apiMethod,
            headers: {
                'Content-Type': "application/json",
                'token': token ? token : ''
            },
            body: JSON.stringify(variables)
        }

        console.log("REQUEST =====>>>>", siteUrl + method, init) 
        
    return fetch( siteUrl + method, init)
        .then(res => res.json()
            .then(data => {
                var apiData = {
                    status: res.status,
                    data: data
                }
                console.log("ApiData=====>>>>", apiData)
                
                return apiData;
            }))
        .catch(err => {
            console.log("err",err + JSON.stringify(err))
            
            var apiData = {
                status: 900,
                data: "Please check your internet connection."
            }
            return apiData
        });
};

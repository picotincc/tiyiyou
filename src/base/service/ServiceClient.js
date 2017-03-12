const host = 'http://kidh5.tusport.cn/service';

export default {

    searchStudentByOpenID: () => {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: `${host}/reportUser/searchStudentByOpenID`,
            }).always(res => {
                resolve(res);
            });
        });
    },

    bindPhoneNumber: (phoneNumber, smsCode) => {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: `${host}/reportUser/bindPhoneNumber`,
                method: "POST",
                data: {
                    phoneNumber,
                    smsCode: smsCode
                }
            }).always(res => {
                console.log(res);
                resolve(res);
            });
        });
    },

    sendCode: (phoneNumber) => {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: `${host}/smsCode`,
                method: "POST",
                data: {
                    phoneNumber
                }
            }).always(res => {
                console.log(res);
                resolve(res);
            });
        });
    },

    getKidSchools: () => {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: `${host}/school/listAllSchools`,
            }).always(res => {
                if (res.code == 0)
                {
                    resolve(res.data.schools);
                }
                else
                {
                    reject("Response with error code:" + res.code);
                }
            });
        });
    },

    getKidClasses: (sid) => {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: `${host}/class/listKhpxBySchool`,
                method: "GET",
                data: {
                    "school": sid
                }
            }).always(res => {
                if(res.code == 0)
                {
                    resolve(res.data.classes);
                }
            });
        });
    },

    addKid: (paras) => {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: `${host}/reportStudent/addReportStudent`,
                method: "POST",
                data: {
                    name: paras.kidName,
                    birthday: paras.birthday,
                    schoolday: paras.schoolday,
                    class_id: paras.classId
                }
            }).always(res => {
                console.log(res);
                resolve(res);
            });
        });
    },



}

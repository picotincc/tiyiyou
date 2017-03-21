const host = '/service';

export default {

    searchStudentByOpenID: () => {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: `${host}/reportUser/searchStudentByOpenID`,
                method: "GET"
            }).always(res => {
                resolve(res);
            });
        });
    },

    searchStudentById: (id) => {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: `${host}/reportStudent/searchStudentById`,
                method: "GET",
                data: {
                    id
                }
            }).always(res => {
                resolve(res);
            });
        });
    },

    hasBindedPhone: () => {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: `${host}/reportUser/hasBindedPhone`,
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
                url: `${host}/reportClass/listClassesBySchool`,
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
                resolve(res);
            });
        });
    },

    updateKid: (paras) => {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: `${host}/reportStudent/updateReportStudent`,
                method: "POST",
                data: {
                    id: paras.id,
                    name: paras.kidName,
                    birthday: paras.birthday,
                    schoolday: paras.schoolday,
                    class_id: paras.classId
                }
            }).always(res => {
                resolve(res);
            });
        });
    }



}

const host = 'http://kid.tusport.cn/api';

export default {

    getKinderGardens: () => {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: `${host}/v1/school/listAllSchools`,
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

    joinActivity: (paras) => {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: `${host}/v1/activity/addActivity`,
                method: "POST",
                data: paras
            }).always(res => {
                if (res.code == 0)
                {
                    resolve(res);
                }
                else
                {
                    reject("Response with error code:" + res.code);
                }
            });
        });
    }

}

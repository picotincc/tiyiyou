const basePath = 'http://kid.tusport.cn/api/v1';

export default class Service {
  static getInstance() {
    if (!Service._instance) {
      Service._instance = new Service();
    }
    return Service._instance;
  }

  fetchStudentInfo(id) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: `${basePath}/report/getStudentInfo`,
        data: {
          id,
        }
      }).done(result => {
        resolve(result.data.student);
      }).fail(error => {
        reject(error);
      });
    });
  }

  fetchSubjectInfo(id) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: `${basePath}/report/getSubjectInfo`,
        data: {
          id,
        }
      }).done(result => {
        console.log(result, 'ok');
        if (result.data) {
          resolve(result.data.subjects.category);
        } else {
          resolve(null);
        }
      }).fail(error => {
        console.log(error, 'bad');
        reject(error);
      });
    });
  }

  fetchCategoryInfo(id) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: `${basePath}/report/getCategoryInfo`,
        data: {
          id,
        }
      }).done(result => {
        console.log(result, 'ok');
        resolve(result.data);
      }).fail(error => {
        console.log(error, 'bad');
        reject(error);
      });
    });
  }

  fetchAdviceInfo(id) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: `${basePath}/report/getAdvice`,
        data: {
          id,
        }
      }).done(result => {
        console.log(result, 'ok');
        resolve(result.advice);
      }).fail(error => {
        console.log(error, 'bad');
        reject(error);
      });
    });
  }
}

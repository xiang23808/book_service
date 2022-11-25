export class formatDate {
  Year: number;
  Months: string | number;
  Day: string | number;
  Hours: string | number;
  Minutes: string | number;
  Seconds: string | number;

  getParam() {
    //三目运算符
    const Dates = new Date();

    //年份
    this.Year = Dates.getFullYear();

    //月份下标是0-11
    this.Months =
      Dates.getMonth() + 1 < 10
        ? '0' + (Dates.getMonth() + 1)
        : Dates.getMonth() + 1;

    //具体的天数
    this.Day = Dates.getDate() < 10 ? '0' + Dates.getDate() : Dates.getDate();

    //小时
    this.Hours =
      Dates.getHours() < 10 ? '0' + Dates.getHours() : Dates.getHours();

    //分钟
    this.Minutes =
      Dates.getMinutes() < 10 ? '0' + Dates.getMinutes() : Dates.getMinutes();

    //秒
    this.Seconds =
      Dates.getSeconds() < 10 ? '0' + Dates.getSeconds() : Dates.getSeconds();
  }

  getDate() {
    this.getParam();
    return this.Year + '-' + this.Months + '-' + this.Day;
  }

  getTime() {
    this.getParam();
    return (
      this.Year +
      '-' +
      this.Months +
      '-' +
      this.Day +
      ' ' +
      this.Hours +
      ':' +
      this.Minutes +
      ':' +
      this.Seconds
    );
  }
}

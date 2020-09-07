export class DateUtils {

  public static getDifferenceBetweenDatesInMillis(firstDate: Date, secondDate: Date): number {
    return Math.abs(firstDate.getTime() - secondDate.getTime());
  }
}

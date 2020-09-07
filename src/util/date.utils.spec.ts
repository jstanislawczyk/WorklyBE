import {DateUtils} from './date.utils';

describe('DateUtils', () => {

  describe('should get positive difference between dates in millis', () => {
    it('if first date is smaller than second', () => {
      // Arrange
      const firstDate: Date = new Date(1000);
      const secondDate: Date = new Date(6000);

      // Act
      const result: number = DateUtils.getDifferenceBetweenDatesInMillis(firstDate, secondDate);

      // Assert
      expect(result).toBe(5000);
    });

    it('if second date is smaller than first', () => {
      // Arrange
      const firstDate: Date = new Date(6000);
      const secondDate: Date = new Date(1000);

      // Act
      const result: number = DateUtils.getDifferenceBetweenDatesInMillis(firstDate, secondDate);

      // Assert
      expect(result).toBe(5000);
    });
  });
});

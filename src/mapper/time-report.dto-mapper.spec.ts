import {TimeReport} from '../entity/time-report';
import {TimeReportFixture} from '../../test/fixture/time-report.fixture';
import {TimeReportDtoMapper} from './time-report.dto-mapper';
import {TimeReportDto} from '../dto/time-report.dto';
import {TimeReportDtoFixture} from '../../test/fixture/time-report-dto.fixture';

describe('TimeReportDtoMapper', () => {

  it('should map to dto', () => {
    // Arrange
    const entity: TimeReport = TimeReportFixture.getTimeReportEntityWithOptionalProperties();

    // Act
    const result: TimeReportDto = TimeReportDtoMapper.toDto(entity);

    // Assert
    expect(result.id).toBe(1);
    expect(result.startDate).toStrictEqual(new Date(1000).toISOString());
    expect(result.endDate).toStrictEqual(new Date(2000).toISOString());
    expect(result.description).toBe('Test description');
  });

  it('should map to entity', () => {
    // Arrange
    const dto: TimeReportDto = TimeReportDtoFixture.getTimeReportDtoWithOptionalProperties();

    // Act
    const result: TimeReport = TimeReportDtoMapper.toEntity(dto);

    // Assert
    expect(result.id).toBeUndefined();
    expect(result.startDate).toStrictEqual(new Date(1000));
    expect(result.endDate).toStrictEqual(new Date(2000));
    expect(result.description).toBe('Test description');
  });

  it('should map to dto list', () => {
    // Arrange
    const entityList: TimeReport[] = [
      TimeReportFixture.getTimeReportEntity(),
      TimeReportFixture.getTimeReportEntityWithOptionalProperties(),
    ];

    // Act
    const result: TimeReportDto[] = TimeReportDtoMapper.toDtoList(entityList);

    // Assert
    expect(result[0].id).toBeUndefined();
    expect(result[0].startDate).toStrictEqual(new Date(1000).toISOString());
    expect(result[0].endDate).toStrictEqual(new Date(2000).toISOString());

    expect(result[1].id).toBe(1);
    expect(result[1].startDate).toStrictEqual(new Date(1000).toISOString());
    expect(result[1].endDate).toStrictEqual(new Date(2000).toISOString());
    expect(result[1].description).toBe('Test description');
  });
});

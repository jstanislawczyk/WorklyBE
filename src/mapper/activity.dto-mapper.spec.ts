import {ActivityDtoMapper} from './activity.dto-mapper';
import {ActivityFixture} from '../../test/fixture/activity.fixture';
import {ActivityDto} from '../dto/activity.dto';
import {ActivityType} from '../enum/activity-type';
import {Activity} from '../entity/activity';
import {ActivityDtoFixture} from '../../test/fixture/activity-dto.fixture';

describe('ActivityDtoMapper', () => {

  it('should map to dto', () => {
    // Arrange
    const entity: Activity = ActivityFixture.getActivityEntityWithOptionalProperties();

    // Act
    const result: ActivityDto = ActivityDtoMapper.toDto(entity);

    // Assert
    expect(result.id).toBe(1);
    expect(result.name).toBe('TestName');
    expect(result.activityType).toBe(ActivityType.PROJECT);
    expect(result.description).toBe('Test description');
  });

  it('should map to entity', () => {
    // Arrange
    const dto: Activity = ActivityDtoFixture.getActivityDtoWithOptionalProperties();

    // Act
    const result: Activity = ActivityDtoMapper.toEntity(dto);

    // Assert
    expect(result.id).toBe(undefined);
    expect(result.name).toBe('TestName');
    expect(result.activityType).toBe(ActivityType.PROJECT);
    expect(result.description).toBe('Test description');
  });

  it('should map to dto list', () => {
    // Arrange
    const entityList: Activity[] = [
      ActivityFixture.getActivityEntity(),
      ActivityFixture.getActivityEntityWithOptionalProperties(),
    ];

    // Act
    const result: ActivityDto[] = ActivityDtoMapper.toDtoList(entityList);

    // Assert
    expect(result[0].id).toBe(undefined);
    expect(result[0].name).toBe('TestName');
    expect(result[0].activityType).toBe(ActivityType.PROJECT);
    expect(result[0].description).toBe(undefined);

    expect(result[1].id).toBe(1);
    expect(result[1].name).toBe('TestName');
    expect(result[1].activityType).toBe(ActivityType.PROJECT);
    expect(result[1].description).toBe('Test description');
  });
});

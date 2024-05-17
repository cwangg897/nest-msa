import { PartialType } from '@nestjs/mapped-types';
import { CreateReservationDto } from './create-reservation.dto';

// 클래스의 필드를 모두 상속받았지만, 모든 필드가 선택적으로 되었습니다.
// 이를 통해 클라이언트는 전체 객체를 다시 보내지 않고도 필요한 필드만 업데이트할 수 있습니다.
export class UpdateReservationDto extends PartialType(CreateReservationDto) {}

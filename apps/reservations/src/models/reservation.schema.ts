import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { AbstractDocument } from '@app/common/database/abstract.schema';

@Schema({ versionKey: false })
export class ReservationDocument extends AbstractDocument {
  @Prop()
  timeStamp: Date;
  @Prop()
  startDate: Date;
  @Prop()
  endDate: Date;
  @Prop()
  userId: string;
  @Prop()
  placeId: string;
  @Prop()
  invoiceId: string;
}
// mongodb할때 필요한거같음
export const ReservationSchema =
  SchemaFactory.createForClass(ReservationDocument);

import { PartialType } from '@nestjs/mapped-types';
import { CreateCommentDto } from './create-comment.dto';

export class UpdateCommentDto extends PartialType(CreateCommentDto) {

    commentID:string;
    ownerCommentID:string;
    commentUserName:string;
    commentUserThumb:string;
    commentTime:string;
    commentText:string;
}

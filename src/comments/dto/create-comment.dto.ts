import { IsNotEmpty } from 'class-validator';

export class CreateCommentDto {

    @IsNotEmpty()
    projectID:string;
    
    @IsNotEmpty()
    comments: [{
        commentID:string,
        ownerCommentID:string,
        commentUserName:string,
        commentUserThumb:string,
        commentTime:string,
        commentText:string
    }]
}

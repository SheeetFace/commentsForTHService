import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Comment {

    @PrimaryGeneratedColumn() 
    id:number;

    @Column()
    projectID:string;
    
    @Column({ type: 'json', nullable: true })
    comments: {
        commentID:string,
        ownerCommentID:string,
        commentUserName:string,
        commentUserThumb:string,
        commentTime:string,
        commentText:string
    }[]

}

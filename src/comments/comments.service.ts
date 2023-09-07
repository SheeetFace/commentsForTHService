import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly categoryRepository: Repository<Comment>
  ){}

  async wakeUpServer(){
    console.log('Ping sent to wake up server');
  }

  async createNewProject(createCommentDto: CreateCommentDto) {
    const newProject = new Comment();
    newProject.projectID = createCommentDto.projectID;
    newProject.comments = [];
  
    return await this.categoryRepository.save(newProject);
  }

  async getAllCommentsByProjectID(projectID:string) {
    const strProjectID =projectID.replace(":", "")

    const comments = await this.categoryRepository.findOne({where: {projectID: strProjectID}});
    
    return  comments
  }


  async addComment(projectID: string, updateCommentDto: UpdateCommentDto) {
    const strProjectID =projectID.replace(":", "")

    const projectComments = await this.categoryRepository.findOne({where: {projectID: strProjectID}});
    if(!projectComments){
        console.error(`comments with ${strProjectID} are not exists in func addComment`);
    }
    projectComments.comments.push(updateCommentDto)

    await this.categoryRepository.save(projectComments)
    return projectComments.comments;
  }


  async removeCommentByCommentID(projectID: string, commentID:string) {
    const strProjectID =projectID.replace(":", "")

    const projectComments = await this.categoryRepository.findOne({where: {projectID: strProjectID}});

    if(!projectComments){
        console.error(`comments with ${strProjectID} are not exists in func removeCommentByCommentID`);
    }

    projectComments.comments = projectComments.comments.filter(comment =>comment.commentID !== commentID)

    await this.categoryRepository.save(projectComments)

    return projectComments.comments;
  }

  async removeProject(projectID: string) {
    const strProjectID =projectID.replace(":", "")

    const projectData = await this.categoryRepository.findOne({
      where: { projectID: strProjectID } 
    });
  
    if (!projectData) {
      console.error('projectID not found');
    }
  
    await this.categoryRepository.delete({
      projectID: strProjectID  
    });

    return `This project removed with ${strProjectID}`;
  }


  async getDatabaseSize(): Promise<{totalSize:string,usedSize:string}>{
    const dbName = process.env.DB_NAME;

    const [result] = await this.categoryRepository.query(
      `SELECT   
         pg_database_size($1) AS totalSize,
         pg_size_pretty(pg_database_size(current_database())) AS usedSize`,  
         [dbName]  
    );
    return result
  }
}

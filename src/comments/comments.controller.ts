import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  createNewProject(@Body() createCommentDto: CreateCommentDto) {
    return this.commentsService.createNewProject(createCommentDto);
  }

  @Get('/get:projectID')
  getAllCommentsByProjectID(@Param('projectID') projectID: string,) {
    return this.commentsService.getAllCommentsByProjectID(projectID);
  }


  @Patch('/patch:projectID')
  addComment(@Param('projectID') projectID: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentsService.addComment(projectID, updateCommentDto);
  }

  @Delete('/removeCommentOne:projectID')
  removeCommentByCommentID(@Param('projectID') projectID: string, @Body() commentID:{commnetID:string}) {
    return this.commentsService.removeCommentByCommentID(projectID,commentID.commnetID);
  }

  @Delete('/removeProject:projectID')
  removeProject(@Param('projectID') projectID: string) {
    return this.commentsService.removeProject(projectID);
  }

  @Get('/databaseSize')
  async getDatabaseSize() {
    return this.commentsService.getDatabaseSize();
  }
}

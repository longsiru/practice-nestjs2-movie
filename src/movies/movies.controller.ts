import { CreateMovieDTO } from './dto/create-movie.dto';
import { Movie } from './entites/movie.entity';
import { MoviesService } from './movies.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

@Controller('movies')
export class MoviesController {
  //没有constructor的时候还没有办法访问service。如何访问service？--->我们需要什么就要ask什么，所以我们需要再在nest.js里面ask一次。
  //将constructor设置为readonly，然后调用（call）moviesService的类（class）moviesService
  constructor(private readonly moviesService: MoviesService) {}
  @Get()
  getAll(): Movie[] {
    return this.moviesService.getAll();
  }

  // @Get('search') //nestjs认为search是一个id。所以我们要把search放在id的上面。才能正常的显示出来。
  // search(@Query('year') searchingYear: string) {
  //   return `we are searching for a movie made after: ${searchingYear}`;
  // }

  //需要什么，必须ask什么。比如下面我们用getone的请求方式是请求参数param。我们想获取url的id，就要用param获取id。然后想将名为ID的参数以字符串类型存储在名为ID的参数中。
  @Get(':id')
  getOne(@Param('id') movieId: number): Movie {
    //后面的ID，可以用不同名字。比如movieId
    //return 'This will return one movies!'; 变成：
    console.log(typeof movieId);
    return this.moviesService.getOne(movieId);
  }

  @Post()
  create(@Body() movieData: CreateMovieDTO) {
    //添加了CreateMovieDTO，然后可以看到movieData里面有什么。

    console.log(movieData);
    return this.moviesService.creacte(movieData);
  }

  @Delete('/:id')
  remove(@Param('id') movieId: number) {
    return this.moviesService.deleteOne(movieId);
  }

  //put 更新了所有资源。也许我们应该些一个补丁（patch）。patch仅更新部分资源。
  @Patch('/:id')
  patch(@Param('id') movieId: number, @Body() updateData) {
    // return {
    //   updateMovie: movieId,
    //   ...updateData,
    // };
    return this.moviesService.update(movieId, updateData);
  }
}

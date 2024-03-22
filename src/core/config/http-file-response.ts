import { HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import * as fs from 'fs-extra';

export interface IFileResponse {
  fileName: string;
  response: Response;
}

export const createFileResponse = ({ fileName, response }: IFileResponse) => {
  const filePath = `src/tmp/${fileName}`;
  try {
    response.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
    response.setHeader('Content-Type', 'application/octet-stream');
    response.setHeader('File-Name', `${fileName}`);
    if (fs.existsSync(filePath)) {
      const fileStream = fs.createReadStream(filePath);
      fileStream.pipe(response);
    } else {
      throw new HttpException(`Error while generating file. Try again.`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  } catch (error) {
    console.log({ error })
    throw new HttpException(`Error while generating file. Try again.`, HttpStatus.INTERNAL_SERVER_ERROR);
  } finally {
    if (fs.existsSync(filePath)) {
      fs.remove(filePath);
    }
  }
};

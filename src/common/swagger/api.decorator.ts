import { HttpStatus, Type, applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiExtraModels,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import { PageEntity } from '../dto/get-pagination-list.dto';
import { ResponseEntity } from '../entity/response.entity';
import { createSchema } from './api.schema';

export const SwaggerAPI = ({
  name,
  success = HttpStatus.OK,
  fail = HttpStatus.NOT_FOUND,
  model = Object,
  isPagination = false,
}: OptionsProps): MethodDecorator => {
  return applyDecorators(
    ApiOperation({
      summary: `${name} API`,
    }),

    ApiExtraModels(PageEntity, ResponseEntity, model),

    ApiNotFoundResponse({
      description:
        '데이터가 없을 때 응답입니다. 404 상태코드와 메시지가 반환됩니다',
      schema: {
        allOf: [
          createSchema({
            status: fail,
            message: `${name}을(를) 찾지 못했습니다. input: {props}`,
            success: false,
          }),
        ],
      },
    }),

    ApiBadRequestResponse({
      description:
        '잘못된 요청일 때 응답입니다. 400 상태코드와 함께 메시지가 반환됩니다',
      schema: {
        allOf: [
          createSchema({
            status: HttpStatus.BAD_REQUEST,
            message: '잘못된 요청에 대한 메세지.',
            success: false,
          }),
        ],
      },
    }),

    ApiResponse({
      status: success,
      description: '성공 시 OK 응답을 반환합니다.',
      schema: {
        allOf: [
          createSchema({
            status: success,
            message: `${name} 했습니다.`,
            success: true,
            data: isPagination
              ? {
                  $ref: getSchemaPath(PageEntity),
                  properties: {
                    results: {
                      type: 'array',
                      items: { $ref: getSchemaPath(model) },
                    },
                  },
                }
              : {
                  $ref: getSchemaPath(model),
                },
          }),
        ],
      },
    }),
  );
};

interface OptionsProps {
  name: string;
  success?: number;
  fail?: number;
  isPagination?: boolean;
  model?: Type<unknown>;
}

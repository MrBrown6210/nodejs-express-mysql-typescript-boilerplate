import { Get, Route, Tags, Post, Body, Path, Delete, Response } from "tsoa";
import { getRepository } from "typeorm";
import { Store } from '../models/store'

export interface IStorePayload {
    title: string
    content: string
    image: string
}

@Route("stores")
@Tags("Store")
export default class StoreController {
  @Get("/")
  public async getStores(): Promise<Array<Store>> {
    const storeRepository = getRepository(Store);
    return storeRepository.find();
  }

  @Post("/")
  public async createStore(@Body() body: IStorePayload): Promise<Store> {
    const storeRepository = getRepository(Store);
    const store = new Store()
    return storeRepository.save({
        ...store,
        ...body
    })
  }

  @Get("/:id")
  public async getStore(@Path() id: string): Promise<Store | null> {
      const storeRepository = getRepository(Store);
      const store = await storeRepository.findOne({ id: Number(id) });
      if (!store) return null;
      return store;
  }

  @Delete('/:id')
  public async removeStore(@Path() id: string): Promise<Store | null> {
    const storeRepository = getRepository(Store);
    const store = await storeRepository.findOne({ id: Number(id) });
    if (!store) return null;
    return storeRepository.remove(store)
  }
}
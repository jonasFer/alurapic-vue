export default class FotoService {

    constructor(resource) {
        this._resource = resource('v1/fotos{/id}');
    }

    list() {
        return this._resource.query()
            .then(res => res.json());
    }

    find(id) {
        return this._resource
            .get({id})
            .then(res => res.json());
    }

    save(foto) {
        return this._resource.save(foto);
    }

    update(foto) {
        return this._resource
            .update({id: foto._id}, foto);
    }

    delete(id) {
        return this._resource.delete({id});
    }
}

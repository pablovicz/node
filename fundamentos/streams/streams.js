import { Readable, Writable, Transform } from 'node:stream';


class OneToHundred extends Readable {

    index = 1;

    _read() {

        const i = this.index++;

        setTimeout(() => {
            if (i > 100) {
                this.push(null);
            } else {

                // readable stream accept only buffers as variables
                const buf = Buffer.from(`${i}\n`)
                this.push(buf);
            }
        }, 1000)
    }
}


class MultiplyByTenStream extends Writable {

    _write(chunk, encoding, callback){
        console.log(Number(chunk.toString()) *10)
        callback()
    }
}

class InverseNumberStream extends Transform {

    _transform(chunk, encoding, callback){
        const transformed = Number(chunk.toString()) * -1

        callback(null, Buffer.from(String(transformed)));
    }
}

new OneToHundred() // needs to receive data
    .pipe(new InverseNumberStream()) // need to receive and return data
    .pipe(new MultiplyByTenStream()); // need to receive data
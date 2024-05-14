import { Column } from "typeorm/decorator/columns/Column";
import { PrimaryGeneratedColumn } from "typeorm/decorator/columns/PrimaryGeneratedColumn";
import { Entity } from "typeorm/decorator/entity/Entity";

@Entity ('solicitado por')
export class SolicitadoPorEntity {
    @PrimaryGeneratedColumn({type:'int',name:'id'})   
    id : number;

    @Column({ type: 'boolean', default: true }) 
    estado: boolean;

    @Column({type:'varchar',length: 200,name: 'nombre',nullable: false})
    nombreArea: string;
    
}


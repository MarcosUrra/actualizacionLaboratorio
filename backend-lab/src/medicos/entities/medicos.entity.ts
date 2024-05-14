import { OneToMany } from "typeorm";
import { Column } from "typeorm/decorator/columns/Column";
import { PrimaryGeneratedColumn } from "typeorm/decorator/columns/PrimaryGeneratedColumn";
import { Entity } from "typeorm/decorator/entity/Entity";
import { IsNumber } from 'class-validator';
import { NuevaOrden } from "src/nueva-orden/nueva-orden.entity";

@Entity({name:'medicos'})
export class MedicosEntity {
    @PrimaryGeneratedColumn({type:'int',name:'id'})  
    id: number; 
    
    @Column({ type: 'boolean', default: true }) 
    estado: boolean; 

    @Column({type:'varchar',length: 100,name: 'apellido',nullable: false})
    apellido: string;

    @Column({ type:'varchar',length: 100,name: 'nombre',nullable: false})
    nombre: string;

    @Column({unique:true, type:'varchar',length: 10,name: 'matricula',nullable: false})
    matricula: string;

    @Column({type:'varchar',length: 20,name: 'especialidad',nullable: false})
    especialidad: string;

    @Column({type:'varchar',length: 20,name: 'tipo de documento',nullable: true})     
    tipoDocumento: string;

    @Column({type:'varchar',length: 20,name: 'numero de documento',nullable: true}) 
    @IsNumber()    
    numeroDocumento: string;
    
     @Column({type:'varchar',length: 30,name: 'telefono',nullable: true})
     @IsNumber()
    telefono: string;

    @OneToMany(() => NuevaOrden, nuevaOrden => nuevaOrden.medicos)
    ordenes: NuevaOrden[];


    apellido_medico: any;
    nombre_medico: any;
    matricula_medico: any;
    especialidad_medico: any;
    tipoDocumento_medico: any;
    numeroDocumento_medico: any;
    telefono_medico: any;
}

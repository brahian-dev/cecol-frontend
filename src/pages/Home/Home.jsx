import React, { useEffect, useRef, useState } from 'react'
import { register } from 'swiper/element/bundle';
import { configSlideHome, fichasHome, configSlideHomeBotton } from '../../provider/dataconfig'; 
import { HashLink } from 'react-router-hash-link';
import styles from '../../styles/home.module.css'
import { Link } from "react-router-dom";
import { isMobile } from "react-device-detect";
import { ToastContainer, toast } from 'react-toastify';

register();

const Home = ()=>{
    const [ dataUser, setDataUser ] = useState(null)
    const [ isLoadForm, setIsLoadForm] = useState(false)
    const swiperElRef = useRef(null);

    const validateCertified = (event)=>{
        event.preventDefault()
        let documentType = event.target[0].value
        let document = event.target[1].value
        if(documentType === "Tipo"){
            toast.error('Selecciona tipo de documento !', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
        if(document.length < 5){
            toast.error('Ingresa número de documento valido !', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
        setIsLoadForm(true)
        var myHeaders = new Headers();
        myHeaders.append("Cookie", "ch_sid=22jt3u41v44kdsv9lljs1vcigl");
        
        var formdata = new FormData();
        formdata.append("tipo_doc", documentType);
        formdata.append("numero_doc", document);
        
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: formdata,
          redirect: 'follow'
        };
        
        fetch("https://www.cecolocp.com/main/webservices/api/v2.php?username=admin&api_key=d4f21953eaa37fedb60e6ec4b9e582d3&action=get_candidate_validate", requestOptions)
        .then(response => response.text())
        .then(result => {
            let response = JSON.parse(result)
            if(response.data.length === 0){
                toast.info('Aún no cuentas con una certificación !', {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            }else if(response.data.length > 0){
                setDataUser(response.data[0])
                setIsLoadForm(false)
            }
        })
        .catch(error => {
            console.log('error', error)
            setIsLoadForm(false)
        });
    }

    useEffect(() => {
        // listen for Swiper events using addEventListener
        swiperElRef.current.addEventListener('progress', (e) => {
        const [progress] = e.detail;
        console.log(progress);
        });

        swiperElRef.current.addEventListener('slidechange', (e) => {
        console.log('slide changed');
        });
    }, []);
    return(
        <>
            <section className={styles.main_slide}>
                <swiper-container
                    ref={swiperElRef}
                    slides-per-view="1"
                    navigation="true"
                    pagination="true"
                    >
                    {
                        configSlideHome.map((slide)=>(
                            <swiper-slide key={slide.title}>
                                <div className={styles.wrapper_contain_slide}>
                                    <img className={styles.img_main_slide} src={isMobile ? slide.imgMobile : slide.img} alt={slide.title_img} />
                                    <span className={styles.title_slide}>{slide.title}</span>
                                    <span className={styles.description_slide}>{slide.description}</span>
                                </div>
                            </swiper-slide>
                        ))
                    }
                </swiper-container>
            </section>
            <section className={styles.certificacion}>
                <div>
                    <img src='/images/personas_clase.png' alt='clases cecol'></img>
                    <p className={styles.description_image_quienes_somos}>CECOL OCP – Certificación de conocimientos y desempeños efectivos al servicio del mercado laboral.</p>
                </div>
                <div className={styles.wrapper_description_certificacion}>
                    <div className={styles.contenttitlecertificacion}>
                        <span className={styles.titlefichas}>Quienes somos</span>
                        <span className={styles.subtitlefichas}>CECOL ocp</span>
                    </div>
                    <p className={styles.description_esquemas}>{`CERTIFICACIÓN DE COMPETENCIA LABORALES S.A.S, NIT 901.693.108-8, Sigla: CE.COMP SAS Se constituyó por documento privado del 06 de marzo de 2023 bajo el número 02944310 del libro IX, matricula 03651875 del 13 de marzo de 2023 ante Cámara de Bogotá D.C.
                        
La sociedad cuenta con un establecimiento de comercio dedicado única y exclusivamente a realizar las actividades de evaluación de la conformidad de acuerdo con los alcances acreditados, denominado CECOL OCP, matrícula 109428 del 10 de junio de 2022 ante Cámara de Comercio de Bogotá D.C.`}
                    </p>
                    <Link to={'/quienes-somos'} className={styles.link_quienes_somos}>Ver más +</Link>
                </div>
            </section>
            <section className={styles.esquemas_description}>
                <div className={styles.wrappertitlefichas}>
                    <div className={styles.contenttitlefichas}>
                        <span className={styles.titlefichas}>Esquemas de</span>
                        <span className={styles.subtitlefichas}>Certificación</span>
                    </div>
                    <p className={styles.descfichas}>
                        En CECOL OCP damos respuesta al nuevo escenario profesional marcado por la necesidad de profesionalización de oficios en los diferentes ámbitos y entornos empresariales, cada vez más internacionalizado y con necesidades puntuales sobre desarrollo humano. La certificación está concebida como un aval para las empresas, que informa con rigor y precisión sobre la especialización y la experiencia de cada profesional y guiará la contratación del perfil más adecuado.
                    </p>
                </div>
            </section>
            <section className={styles.contentfichas}>
                {
                    isMobile?
                    <swiper-container
                        ref={swiperElRef}
                        slides-per-view="1"
                        navigation="true"
                        pagination="true"
                        >
                        {fichasHome.map((ficha, index)=>(
                            <swiper-slide key={ficha.title}>
                                <div key={ficha.title} className={styles.ficha}>
                                    <img src={ficha.urlIcon} alt={ficha.title} className={styles.imgficha}></img>
                                    <span className={styles.titleficha}>{ficha.title}</span>
                                    <HashLink to={ficha.urlRedirect} className={styles.linkficha}><span>{ficha.titleRedirect}</span></HashLink>
                                </div>
                            </swiper-slide>
                        ))}
                    </swiper-container>
                    :
                    fichasHome.map((ficha, index)=>(
                        <div key={ficha.title} className={styles.ficha}>
                            <img src={ficha.urlIcon} alt={ficha.title} className={styles.imgficha}></img>
                            <span className={styles.titleficha}>{ficha.title}</span>
                            <HashLink to={ficha.urlRedirect} className={styles.linkficha}><span>{ficha.titleRedirect}</span></HashLink>
                        </div>
                    ))
                }
            </section>
            <section className={styles.formcertified}>
                    <div className={styles.formcertified_desc}>
                        <img src={'/images/sheets.png'} alt='' className={styles.formcertified_desc_img}/>
                        <span className={styles.formcertified_desc_title}>Valida la información de la certificación</span>
                        <span className={styles.formcertified_desc_desc}>solicite fácilmente tus certificados vigentes.</span>
                    </div>
                    
                    {
                        isLoadForm ? 
                            <div className={styles.formcertified_form}>
                                <div className={styles.loading}></div>
                            </div>
                        :
                        dataUser == null?
                        <form className={styles.formcertified_form} onSubmit={validateCertified}>
                            <span className={styles.formcertified_form_title}>Complete el siguiente formulario</span>
                            <span className={styles.formcertified_form_subtitle}>Para validar su certificado</span>
                            <span className={styles.formcertified_form_subsubtitle}>Ingrese su documento*</span>
                            <div className={styles.formcertified_form_wrapper_input}>
                                <select className={styles.formcertified_form_list}>
                                    <option className={styles.formcertified_form_option} value="1">CC</option>
                                    <option className={styles.formcertified_form_option} value="2">NIT</option>
                                </select>
                                <input className={styles.formcertified_form_text} type="number" name="" id="" />
                            </div>
                            <button className={styles.formcertified_form_button} type="submit">Validar</button>
                        </form>
                        :
                        <div className={styles.formcertified_form}>
                            <span className={styles.certified}>{dataUser.nombre} {dataUser.apellido} identificado con número {dataUser.numero_doc} de la ciudad de {dataUser.lugar_expedicion} cuenta con una certificación:</span>
                            <div><span className={styles.label}></span><span className={styles.value}>{dataUser.esquema}</span></div>
                            <div><span className={styles.label}>Número de certificado: </span><span className={styles.value}>{dataUser.numero_certificado}</span></div>
                            <div><span className={styles.label}>Otorgado: </span><span className={styles.value}>{dataUser.fecha_otorgamiento}</span></div>
                            <div><span className={styles.label}>Fecha de vencimiento: </span><span className={styles.value}>{dataUser.fecha_vencimiento}</span></div>
                            <div><span className={styles.label}>Fecha de renovación: </span><span className={styles.value}>{dataUser.fecha_renovacion}</span></div>
                        </div>
                    }
            </section>
            <section>
                {
                    <swiper-container
                        ref={swiperElRef}
                        slides-per-view="1"
                        navigation="true"
                        pagination="true"
                        >
                        {
                            configSlideHomeBotton.map((slide)=>(
                                <swiper-slide>
                                    <div className={styles.wrapper_contain_slide_bottom}>
                                        <div className={styles.containinfo}>
                                            <span className={styles.description_slide_bottom}>{slide.description}</span>
                                            <span className={styles.name_slide_bottom}>{slide.name}</span>
                                            <span className={styles.profession_slide_bottom}>{slide.profession}</span>
                                        </div>
                                        <img className={styles.img_main_slide_bottom} src={slide.img} alt={slide.title_img} />
                                    </div>
                                </swiper-slide>
                            ))
                        }
                    </swiper-container>
                }
            </section>
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </>
    )
}

export default Home
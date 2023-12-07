<template>
  <div class="container mt-5">
      <h2 class="text-center mb-4">Formulario Salud Infantil Recién Nacido/a</h2>
  
      <form @submit.prevent="guardarInformacionRN">


        
        <div class="row">
          <div class="col-md-4 mb-3">
            <label for="pesonacer">Peso al nacer(g):</label>
            <input type="number" id="pesonacer" v-model="formulario.pesonacer" class="form-control" required min="1">
          </div>
  
          <div class="col-md-4 mb-3">
            <label for="pcefalico">P. Cefálico(cm):</label>
            <input type="decimal" id="pcefalico" v-model="formulario.pcefalico" class="form-control" required>
          </div>
  
          <div class="col-md-4 mb-3">
            <label for="longitud">Longitud(cm):</label>
            <input type="decimal" id="longitud" v-model="formulario.longitud" class="form-control" required>
          </div>
        </div>
  
        <div class="row">
          <div class="col-md-4 mb-3">
            <label for="sem">Edad Gestacional (semanas):</label>
            <input type="number" id="sem" v-model="formulario.sem" class="form-control" required min="1">
          </div>
  
          <div class="col-md-4 mb-3">
            <label for="dias">Edad Gestacional (días):</label>
            <input type="number" id="dias" v-model="formulario.dias" class="form-control" required min="1">
          </div>
  
                        <div class="col-md-4 mb-3">
                  <label for="pesoeg">Peso E.G.:</label>
                  <select id="pesoeg" v-model="formulario.pesoeg" class="form-control" required>
                    <option value="Adecuado">Adecuado</option>
                    <option value="Pequeño">Pequeño</option>
                    <option value="Grande">Grande</option>
                  </select>
                </div>

        </div>
  
        <div class="row">
          <div class="col-md-4 mb-3">
            <label for="apgar1">APGAR(MIN) 1er:</label>
            <input type="number" id="apgar1" v-model="formulario.apgar1" class="form-control" required min="0">
          </div>
  
          <div class="col-md-4 mb-3">
            <label for="apgar2">APGAR(MIN)  5to:</label>
            <input type="number" id="apgar2" v-model="formulario.apgar2" class="form-control" required min="0">
          </div>
  
          <div class="col-md-4 mb-3">
            <label for="apgar3">APGAR(MIN) 10mo:</label>
            <input type="number" id="apgar3" v-model="formulario.apgar3" class="form-control" required min="0">
          </div>
        </div>

        <h2 class="mt-4">Reanimación</h2>

        <div class="row">

                    <div class="col-md-4 mb-3">
                      <div class="form-check">
                        <input type="checkbox" id="estimulac" v-model="formulario.estimulac" class="form-check-input">
                        <label for="estimulac" class="form-check-label">Estimulación</label>
                      </div>
                    </div>

                    <div class="col-md-4 mb-3">
                      <div class="form-check">
                        <input type="checkbox" id="aspiracion" v-model="formulario.aspiracion" class="form-check-input">
                        <label for="aspiracion" class="form-check-label">Aspiración</label>
                      </div>
                    </div>


                    <div class="col-md-4 mb-3">
                    <div class="form-check">
                      <input type="checkbox" id="mascara" v-model="formulario.mascara" class="form-check-input">
                      <label for="mascara" class="form-check-label">Máscara</label>
                    </div>
                  </div>

                  <!-- Bolsa -->
                  <div class="col-md-4 mb-3">
                    <div class="form-check">
                      <input type="checkbox" id="bolsa" v-model="formulario.bolsa" class="form-check-input">
                      <label for="bolsa" class="form-check-label">Bolsa</label>
                    </div>
                  </div>

                  <!-- Tubo Endotraqueal -->
                  <div class="col-md-4 mb-3">
                    <div class="form-check">
                      <input type="checkbox" id="tuboendotraq" v-model="formulario.tuboendotraq" class="form-check-input">
                      <label for="tuboendotraq" class="form-check-label">Tubo Endotraqueal</label>
                    </div>
                  </div>

                  <!-- Masaje Cardíaco -->
                  <div class="col-md-4 mb-3">
                    <div class="form-check">
                      <input type="checkbox" id="masajec" v-model="formulario.masajec" class="form-check-input">
                      <label for="masajec" class="form-check-label">Masaje Cardíaco</label>
                    </div>
                  </div>

                  <!-- Medicación -->
                  <div class="col-md-4 mb-3">
                    <div class="form-check">
                      <input type="checkbox" id="medicacion" v-model="formulario.medicacion" class="form-check-input">
                      <label for="medicacion" class="form-check-label">Medicación</label>
                    </div>
                  </div>
                  </div>
                  
        

        


        <h2 class="mt-4">Atendió Parto</h2>


        <div class="row">

        
          <!-- Parto Médico -->
              <div class="col-md-4 mb-3">
                <div class="form-check">
                  <input type="checkbox" id="partomedico" v-model="formulario.partomedico" class="form-check-input">
                  <label for="partomedico" class="form-check-label">Parto Médico</label>
                </div>
              </div>

<!-- Parto Obstétrico -->
            <div class="col-md-4 mb-3">
              <div class="form-check">
                <input type="checkbox" id="partoobst" v-model="formulario.partoobst" class="form-check-input">
                <label for="partoobst" class="form-check-label">Parto Obstétrico</label>
              </div>
            </div>

<!-- Parto Enfermera -->
              <div class="col-md-4 mb-3">
                <div class="form-check">
                  <input type="checkbox" id="partoenf" v-model="formulario.partoenf" class="form-check-input">
                  <label for="partoenf" class="form-check-label">Parto Enfermera</label>
                </div>
              </div>

<!-- Parto Auxiliar -->
          <div class="col-md-4 mb-3">
            <div class="form-check">
              <input type="checkbox" id="partoauxil" v-model="formulario.partoauxil" class="form-check-input">
              <label for="partoauxil" class="form-check-label">Parto Auxiliar</label>
            </div>
          </div>

<!-- Parto Estudiante -->
          <div class="col-md-4 mb-3">
            <div class="form-check">
              <input type="checkbox" id="partoestud" v-model="formulario.partoestud" class="form-check-input">
              <label for="partoestud" class="form-check-label">Parto Estudiante</label>
            </div>
          </div>

<!-- Parto Empírico -->
          <div class="col-md-4 mb-3">
            <div class="form-check">
              <input type="checkbox" id="partoempir" v-model="formulario.partoempir" class="form-check-input">
              <label for="partoempir" class="form-check-label">Parto Empírico</label>
            </div>
          </div>

<!-- Otro tipo de Parto -->
            <div class="col-md-4 mb-3">
              <div class="form-check">
                <input type="checkbox" id="partootro" v-model="formulario.partootro" class="form-check-input">
                <label for="partootro" class="form-check-label">Otro tipo de Parto</label>
              </div>
            </div>
              
        
        </div>
        

        <h2 class="mt-4">Atendió Neonato</h2>
       

        <div class="row">

          <!-- Seccion  Neonato -->
                  <div class="col-md-4 mb-3">
                    <div class="form-check">
                      <input type="checkbox" id="neomedico" v-model="formulario.neomedico" class="form-check-input">
                      <label for="neomedico" class="form-check-label">Atención Neonatal Médica</label>
                    </div>
                  </div>

                  <div class="col-md-4 mb-3">
                    <div class="form-check">
                      <input type="checkbox" id="neoobst" v-model="formulario.neoobst" class="form-check-input">
                      <label for="neoobst" class="form-check-label">Atención Neonatal Obstétrica</label>
                    </div>
                  </div>

                  <div class="col-md-4 mb-3">
                    <div class="form-check">
                      <input type="checkbox" id="neoenf" v-model="formulario.neoenf" class="form-check-input">
                      <label for="neoenf" class="form-check-label">Atención Neonatal Enfermera</label>
                    </div>
                  </div>

                  <div class="col-md-4 mb-3">
                    <div class="form-check">
                      <input type="checkbox" id="neoauxil" v-model="formulario.neoauxil" class="form-check-input">
                      <label for="neoauxil" class="form-check-label">Atención Neonatal Auxiliar</label>
                    </div>
                  </div>

                  <div class="col-md-4 mb-3">
                    <div class="form-check">
                      <input type="checkbox" id="neoestud" v-model="formulario.neoestud" class="form-check-input">
                      <label for="neoestud" class="form-check-label">Atención Neonatal Estudiante</label>
                    </div>
                  </div>

                  <div class="col-md-4 mb-3">
                    <div class="form-check">
                      <input type="checkbox" id="neoempir" v-model="formulario.neoempir" class="form-check-input">
                      <label for="neoempir" class="form-check-label">Atención Neonatal Empírica</label>
                    </div>
                  </div>

                  <div class="col-md-4 mb-3">
                    <div class="form-check">
                      <input type="checkbox" id="neootro" v-model="formulario.neootro" class="form-check-input">
                      <label for="neootro" class="form-check-label">Otro tipo de Atención Neonatal</label>
                    </div>
                  </div>


        </div>

        <!-- Establecimiento de Salud -->
        <h2 class="mt-4">Lugar Parto</h2>


        <div class="row">

                <div class="col-md-4 mb-3">
                      <div class="form-check">
                        <input type="checkbox" id="establesalud" v-model="formulario.establesalud" class="form-check-input">
                        <label for="establesalud" class="form-check-label">Establecimiento de Salud</label>
                      </div>
                    </div>

          
                    <div class="col-md-4 mb-3">
                      <div class="form-check">
                        <input type="checkbox" id="domicilio" v-model="formulario.domicilio" class="form-check-input">
                        <label for="domicilio" class="form-check-label">Domicilio</label>
                      </div>
                    </div>

               
                    <div class="col-md-4 mb-3">
                      <div class="form-check">
                        <input type="checkbox" id="otro" v-model="formulario.otro" class="form-check-input">
                        <label for="otro" class="form-check-label">Otro</label>
                      </div>
                    </div>

        </div>

        <h2 class="mt-4">Método</h2>


        <div class="row">
             <!-- Método Canguro -->
             <div class="col-md-4 mb-3">
                        <div class="form-check">
                          <input type="checkbox" id="metodocanguro" v-model="formulario.metodocanguro" class="form-check-input">
                          <label for="metodocanguro" class="form-check-label">Método Canguro</label>
                        </div>
                      </div>

        </div>  

        <h2 class="mt-4">Examen físico</h2>


        <div class="row">
          
          <div class="col-md-4 mb-3">
                  <div class="form-check">
                    <input type="checkbox" id="examenfisico" v-model="formulario.examenfisico" class="form-check-input">
                    <label for="examenfisico" class="form-check-label">Examen Físico</label>
                  </div>
                </div>

        </div>

        <h2 class="mt-4">Defectos congénitos</h2>

         <div class="row">

          <!-- Defectos Congénitos -->
                <div class="col-md-4 mb-3">
                  <div class="form-check">
                    <input type="checkbox" id="defectoscongenitos" v-model="formulario.defectoscongenitos" class="form-check-input">
                    <label for="defectoscongenitos" class="form-check-label">Defectos Congénitos</label>
                  </div>
                </div>

                <!-- Valor Defectos Congénitos (solo visible si defectoscongenitos es true) -->
                <div v-if="formulario.defectoscongenitos" class="col-md-8 mb-3">
                  <div class="form-group">
                    <label for="valordefectoscongenitos">Valor Defectos Congénitos:</label>
                    <input type="text" id="valordefectoscongenitos" v-model="formulario.valordefectoscongenitos" class="form-control">
                  </div>
                </div>

         </div>   

         <h2 class="mt-4">Otros</h2>

            <div class="row">

              <!-- Tipificación -->
                      <div class="col-md-4 mb-3">
                        <div class="form-group">
                          <label for="tipificacion">Tipificación:</label>
                          <input type="text" id="tipificacion" v-model="formulario.tipificacion" class="form-control">
                        </div>
                      </div>

                      <!-- Vitamina K -->
                      <div class="col-md-4 mb-3">
                        <div class="form-check">
                          <input type="checkbox" id="vitaminaK" v-model="formulario.vitaminaK" class="form-check-input">
                          <label for="vitaminaK" class="form-check-label">Vitamina K</label>
                        </div>
                      </div>

                      <!-- Profilaxis -->
                      <div class="col-md-4 mb-3">
                        <div class="form-check">
                          <input type="checkbox" id="profilaxis" v-model="formulario.profilaxis" class="form-check-input">
                          <label for="profilaxis" class="form-check-label">Profilaxis</label>
                        </div>
                      </div>

            </div>

            <h2 class="mt-4">Enfermedades</h2>

                <div class="row">
                        <!-- Enfermedades -->
                        <div class="col-md-4 mb-3">
                          <div class="form-check">
                            <input type="checkbox" id="enfermedades" v-model="formulario.enfermedades" class="form-check-input">
                            <label for="enfermedades" class="form-check-label">1 o Más</label>
                          </div>
                        </div>

                        <!-- Valor Enfermedades -->
                        <div class="col-md-4 mb-3" v-if="formulario.enfermedades">
                          <div class="form-group">
                            <label for="valorenfermedades">CIE 10:</label>
                            <input type="text" id="valorenfermedades" v-model="formulario.valorenfermedades" class="form-control">
                          </div>
                        </div>

                </div>

                <h2 class="mt-4">TAMIZAJE</h2>

                <div class="row">

                                <!-- Tamizaje Meta -->
              <div class="col-md-4 mb-3">
                <div class="form-check">
                  <input type="checkbox" id="tamizajemeta" v-model="formulario.tamizajemeta" class="form-check-input">
                  <label for="tamizajemeta" class="form-check-label">Tamizaje Metabólico</label>
                </div>
              </div>

                    <!-- Tamizaje Audi -->
                    <div class="col-md-4 mb-3">
                      <div class="form-check">
                        <input type="checkbox" id="tamizajeaudi" v-model="formulario.tamizajeaudi" class="form-check-input">
                        <label for="tamizajeaudi" class="form-check-label">Tamizaje Auditivo</label>
                      </div>
                    </div>

                    
                  <!-- Apego -->
                       


              </div>

              <h2 class="mt-4">Otros</h2>

              <div class="row">
                <div class="col-md-4 mb-3">
                          <div class="form-check">
                            <input type="checkbox" id="apego" v-model="formulario.apego" class="form-check-input">
                            <label for="apego" class="form-check-label">Apego</label>
                          </div>
                        </div>

                        <!-- Ligadura de Cordón -->
                        <div class="col-md-4 mb-3">
                          <div class="form-check">
                            <input type="checkbox" id="ligaduracordon" v-model="formulario.ligaduracordon" class="form-check-input">
                            <label for="ligaduracordon" class="form-check-label">Ligadura de Cordón</label>
                          </div>
                        </div>

                        <!-- Meconio -->
                        <div class="col-md-4 mb-3">
                          <div class="form-check">
                            <input type="checkbox" id="meconio" v-model="formulario.meconio" class="form-check-input">
                            <label for="meconio" class="form-check-label">Meconio</label>
                          </div>
                        </div>

                        <!-- Lactancia Inmediata -->
                        <div class="col-md-4 mb-3">
                          <div class="form-check">
                            <input type="checkbox" id="lactanciainmediata" v-model="formulario.lactanciainmediata" class="form-check-input">
                            <label for="lactanciainmediata" class="form-check-label">Lactancia Inmediata</label>
                          </div>
                        </div>
              </div>


              <h2 class="mt-4">Información Egreso RN</h2>


              <div class="row">

                                    <!-- Peso de Egreso -->
                    <div class="col-md-4 mb-3">
                      <div class="form-group">
                        <label for="pesoegreso">Peso de Egreso:</label>
                        <input type="number" id="pesoegreso" v-model="formulario.pesoegreso" class="form-control">
                      </div>
                    </div>

                    <!-- Fecha de Alta -->
                    <div class="col-md-5 mb-3">
                      <div class="form-group">
                        <label for="fechaalta">Fecha de Alta:</label>
                        <input type="date" id="fechaalta" v-model="formulario.fechaalta" class="form-control">
                      </div>
                    </div>

                    <!-- Lactancia Exclusiva -->
                    <div class="col-md-4 mb-3">
                      <div class="form-check">
                        <input type="checkbox" id="lactanciaexclusiva" v-model="formulario.lactanciaexclusiva" class="form-check-input">
                        <label for="lactanciaexclusiva" class="form-check-label">Lactancia Exclusiva</label>
                      </div>
                    </div>

                    <!-- Parcial -->
                    <div class="col-md-4 mb-3">
                      <div class="form-check">
                        <input type="checkbox" id="parcial" v-model="formulario.parcial" class="form-check-input">
                        <label for="parcial" class="form-check-label">Parcial</label>
                      </div>
                    </div>

                    <!-- Artificial -->
                    <div class="col-md-4 mb-3">
                      <div class="form-check">
                        <input type="checkbox" id="artificial" v-model="formulario.artificial" class="form-check-input">
                        <label for="artificial" class="form-check-label">Artificial</label>
                      </div>
                    </div>

                    <!-- Leche Humana -->
                    <div class="col-md-4 mb-3">
                      <div class="form-check">
                        <input type="checkbox" id="lechehumana" v-model="formulario.lechehumana" class="form-check-input">
                        <label for="lechehumana" class="form-check-label">Leche Humana</label>
                      </div>
                    </div>
                    
                    <!-- Responsable de Egreso -->

                </div>

                <div class="row">
                  <div class="col-md-6 mb-3">
                      <div class="form-group">
                        <label for="responsableegreso">Responsable de Egreso:</label>
                        <input type="text" id="responsableegreso" v-model="formulario.responsableegreso" class="form-control" required>
                      </div>
                    </div>
                </div>
                  
  
                    <div class="col-md-12">
                      <button type="submit" class="btn btn-primary">Guardar</button>
                    </div> 
    </form>
  </div>
</template>
  <script>
  import axios from 'axios';
  import swal from 'sweetalert';
  import { BASE_URL } from '../store/config';
  
  export default {
    props: {
      ninoId: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
        formulario: {
          pesonacer: null,
          pcefalico: null,
          longitud: null,
          sem: null,
          dias: null,
          pesoeg: '',
          apgar1: null,
          apgar2: null,
          apgar3: null,
          estimulac: false,
          aspiracion: false,
          mascara: false,
          bolsa: false,
          tuboendotraq: false,
          masajec: false,
          medicacion:false,
          //
          partomedico: false,
          partoobst: false,
          partoenf: false,
          partoauxil: false,
          partoestud: false,
          partoempir: false,
          partootro: false,
          //    
          neomedico: false,
          neoobst: false,
          neoenf: false,
          neoauxil: false,
          neoestud: false,
          neoempir: false,
          neootro: false,

          establesalud: false,
          domicilio: false,
          otro: false,

           //metodo canguro
          metodocanguro: false,
          examenfisico: false,
            // enfermedades
          defectoscongenitos: false,
          valordefectoscongenitos: '',

          tipificacion: '',
          vitaminaK: false,
          profilaxis: false,

          enfermedades: false,
          valorenfermedades: '',

          tamizajemeta: false,
          tamizajeaudi: false,

          
          apego: false,
          ligaduracordon: false,
          meconio: false,
          lactanciainmediata: false,

          pesoegreso: null,
          fechaalta: null,

          lactanciaexclusiva: false,
          parcial: false,
          artificial: false,
          lechehumana: false,

          responsableegreso: '',


          ninoId:''
          // Agrega más propiedades según sea necesario
        },
      };
    },
    methods: {
      async guardarInformacionRN() {
        try {
            this.formulario.ninoId = this.ninoId; 

          const response = await axios.post(
            `${BASE_URL}/api/rn`,
            {
              ...this.formulario
            },
            {
              headers: {
                'x-access-token': this.$store.state.auth.user.accessToken,
              },
            }
          );
  
          swal("Éxito", response.data.message, "success");
        } catch (error) {
          console.error("Error al guardar información RN:", error);
          swal("Error", "Hubo un error al guardar la información.", "error");
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* Estilos adicionales si es necesario */
  </style>
  
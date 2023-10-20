import "./Policies.css";

const Policies = () => {
	return (
		<div className="policies-container">
			<h3>¿Qué deberías que saber?</h3>
			<div className="condiciones-container">
				<div className="condiciones normas-generales">
					<h4>Normas generales</h4>
					<ul>
						<li>
							Todos nuestros instrumentos y accesorios se entregan en perfectas
							condiciones, y deben ser devueltos en los mismos términos.
						</li>
						<li>
							En caso de que el instrumento o sus accesorios sean devueltos en
							mal estado, el cliente deberá responsabilizarse por los costos
							asociados a su reparación o reemplazo, según corresponda.
						</li>
						<li>
							Los instrumentos pueden ser utilizados tanto en espacios privados
							como públicos, siempre y cuando se respeten las anteriores
							condiciones.
						</li>
					</ul>
				</div>
				<div className="condiciones precauciones">
					<h4>Precauciones y recaudos</h4>
					<ul>
						<li>
							Antes de retirar el instrumento, recomendamos revisarlo
							detenidamente para comprobar que el mismo se encuentra en las
							excelentes condiciones que nosotros garantizamos.
						</li>
						<li>
							Es imprescindible manejar el instrumento con cuidado y evitar
							situaciones de riesgo que puedan provocar daños. En caso de
							instrumentos eléctricos, se recomienda revisar el voltaje antes de
							enchufarlo.
						</li>
						<li>
							Se recomienda siempre mantener el instrumento en un entorno seguro
							cuando no esté siendo utilizado, así como protegerlo de
							condiciones climáticas adversas.
						</li>
					</ul>
				</div>
				<div className="condiciones politicas-cancelacion">
					<h4>Políticas de cancelación</h4>
					<ul>
						<li>
							Para obtener un reembolso completo, la cancelación de la reserva
							deberá realizarse con una anticipación de al menos 5 (cinco) días
							desde que dicha reserva fue confirmada en el sitio.
						</li>
						<li>
							En caso de preferirlo, se puede optar por una gift card con el
							saldo a favor de la cancelación, para ser utilizado en futuras
							reservas.
						</li>
						<li>
							En caso de cancelar fuera del periodo mencionado, se realizará un
							cargo por cancelación, equivalente al 10% del monto total de la
							reserva, sin excepción.
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default Policies;
